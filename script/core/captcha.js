(function (App) {
    let imgsrcre = /<img src="\.([^"]+)"/
    App.Data.CaptchaURLs = {}
    App.Data.CaptchaCode = ""
    App.Data.LastFullme = 0
    App.Data.LastFullmeSuccess = 0
    App.Data.IsLastFullmeSuccess = false
    App.Data.CaptchaCountSuccess = 0
    App.Data.CaptchaCountFail = 0
    App.Data.CaptchaCurrent = 0
    App.Data.CaptchaCurrentURL = ""
    App.Data.CaptchaCurrentType = ""
    App.Data.CatpchaLastURL = ""
    App.Data.CaptchaCurrentData = null
    App.Core.CaptchaReq = null

    App.API.CaptchaSaveURL = function (type) {
        App.Data.CaptchaURLs[type] = App.Data.CatpchaLastURL
    }
    App.Core.CaptchaLoadURL = function () {
        App.Data.CaptchaCurrentURL = App.Data.CaptchaURLs[App.Data.CaptchaCurrentType]
    }
    App.API.Captcha = function (data, final, fail) {
        if (typeof (data) == "string") {
            data = {
                type: data,
            }
        }
        let type = data.type
        switch (type) {
            case "zone":
            case "zonestart":
            case "zoneend":
            case "tiangan":
            case "flowers":
            case "exits":
            case "2words":
            case "zoneroom":
                App.API.CaptchaSaveURL(type)
                break
        }
        let a = App.Automaton.Push(["core.state.captcha.captcha"], final)
        App.Data.CaptchaCurrent = 0
        App.Data.CaptchaCurrentType = type
        App.Data.CaptchaCurrentData = data
        if (fail) {
            a.WithFailState(fail)
        }
        App.Next()
    }
    App.Core.CaptchaFullme = function () {
        App.Core.Quest.Cooldowns["fullme"] = -1
        App.Core.Quest.InsertQuest("fullme")
    }
    App.Core.CaptchaLoad = function () {
        App.Core.CaptchaReq = HTTP.New("GET", App.Data.CaptchaCurrentURL)
        App.Core.CaptchaReq.AsyncExecute("App.Core.CatpchaParseHTML")
    }
    App.Core.CatpchaParseHTML = function (name, id, code, data) {
        if (code != 0) {
            throw data
        }
        if (code == 0) {
            let result = imgsrcre.exec(App.Core.CaptchaReq.ResponseBody())
            if (result == null) {
                throw "无法匹配图片地址"
            }
            let url = "http://fullme.pkuxkx.net" + result[1]
            App.Core.CaptchaShow(url)
        }
    }
    App.Core.SendFullme = function () {
        App.Data.CaptchaURLs["fullme"] = ""
        App.Send("fullme 1;fullme 1;fullme 1;fullme")
        App.Response("core", "captchafullme")
    }
    App.RegisterCallback("core.captchafullme", function () {
        App.RaiseStateEvent("core.state.captcha.fullme")
    })
    App.Bind("Response.core.captchafullme", "core.captchafullme")

    App.Core.CaptchaShow = function (url) {
        let intro
        switch (App.Data.CaptchaCurrentType) {
            case "zone":
                intro = "忽略红色字符，地名部分必须准确，房间名识别不出可留空"
                break
            case "zonestart":
                intro = "忽略红色字符，请输入开始位置的区域名，地名部分必须准确，房间名识别不出可留空"
                break
            case "zoneend":
                intro = "忽略红色字符，请输入结束位置的区域名，地名部分必须准确，房间名识别不出可留空"
                break
            case "tiangan":
                intro = "忽略红色字符，请输入天干地支 甲乙丙丁戊己庚辛壬癸 子丑寅卯辰巳午未申酉戌亥,用空格分隔"
                break
            case "flowers":
                intro = "忽略红色字符，请输入花名，用空格分隔 月季 牡丹"
                break
            case "exits":
                intro = "忽略红色字符，请依次输入用|分割的方向，比如 东北|东南|西|便道"
                break
            case "zoneroom":
                intro = "忽略红色字符，请输入空格分割的区域和房间名，如 扬州 客店"
                break
            case "2words":
                intro = "忽略红色字符，请输入图中的两个词语。如果有空格将会分多次发送。"
                break

            default:
                intro = "忽略红色字符，如果是方向性文字，每对中括号内文字为一组"
        }
        let vp = Userinput.newvisualprompt("验证码", intro, url)
        vp.setrefreshcallback("App.Core.CatpchaRefresh")
        vp.publish("App.Core.OnCaptchaSubmit")
    }
    App.Core.CatpchaRefresh = function (name, id, code, data) {
        if (code == 0) {
            App.Core.CaptchaLoad()
        }
    }
    App.Core.OnCaptchaSubmit = function (name, id, code, data) {
        if (code == 0 && data) {
            App.Data.CaptchaCode = data
            App.RaiseStateEvent("captcha.submit")
        }
    }
    App.Core.CaptchaOnURL = function (name, output, wildcards) {
        App.Data.CatpchaLastURL = wildcards[0]
    }
    App.Core.CaptchaFullmeLater = function (name, output, wildcards) {
        App.Data.LastFullme = Now() - wildcards[2] * 60000 - wildcards[4] * 1000
        App.Data.CatpchaLastURL = ""
        App.Data.CaptchaURLs["fullme"] = ""
    }

    App.Core.CaptchaOnGonghao = function (name, output, wildcards) {
        App.API.CaptchaSaveURL("工号")
    }
    App.Core.CaptchaOnFullmeCmd = function (name, output, wildcards) {
        App.API.CaptchaSaveURL("fullme")
    }
    App.Core.CaptchaOnGongHaoSuccess = function (name, output, wildcards) {
        App.RaiseStateEvent("captcha.success")
        App.Raise("captcha.success")
    }
    App.Core.CaptchaOnSuccess = function (name, output, wildcards) {
        App.Data.LastFullme = Now()
        App.Data.IsLastFullmeSuccess = true
        App.Data.LastFullmeSuccess = Now()
        App.Core.CaptchaAlias()
        App.RaiseStateEvent("captcha.success")
        App.Raise("captcha.success")
        App.Raise("HUDUpdate")
    }
    App.Core.CaptchaOnGonghaoFail = function (name, output, wildcards) {
        App.RaiseStateEvent("captcha.fail")
    }
    App.Core.CaptchaOnOther = function (name, output, wildcards) {
        App.RaiseStateEvent("captcha.other")
    }

    App.Core.CaptchaOnFail = function (name, output, wildcards) {
        App.Data.LastFullme = Now()
        App.Data.IsLastFullmeSuccess = false
        App.Core.CaptchaAlias()
        App.RaiseStateEvent("captcha.fail")
        App.Raise("captcha.fail")
        App.Raise("HUDUpdate")
    }
    App.Core.CaptchaAlias = function () {
        App.Send("alias lastfullme " + App.Data.LastFullmeSuccess + "|" + App.Data.LastFullme)
    }
    App.Core.CaptchaOnAlias = function (name, output, wildcards) {
        App.Data.LastFullmeSuccess = wildcards[0] - 0
        App.Data.LastFullme = wildcards[1] - 0
        App.Raise("HUDUpdate")
    }

    App.RegisterCallback("app.core.captcha.dummy", function () {
        let dummy = GetVariable("dummy_id").trim()
        if (dummy) {
            App.Send("tell " + dummy + " 要打码了！")
        }
    })
    App.Bind("captcha", "app.core.captcha.dummy")
    App.RegisterState(new (Include("core/state/captcha/captcha.js"))())
    App.RegisterState(new (Include("core/state/captcha/fullme.js"))())
    App.RegisterState(new (Include("core/state/captcha/fullmestart.js"))())

})(App)