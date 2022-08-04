(function(App){
    let imgsrcre=/<img src="\.([^"]+)"/
    App.Data.CaptchaURLs={} 
    App.Data.CaptchaCode=""
    App.Data.LastFullme=0
    App.Data.LastFullmeSuccess=0
    App.Data.IsLastFullmeSuccess=false
    App.Data.CaptchaCountSuccess=0
    App.Data.CaptchaCountFail=0
    App.Data.CaptchaCurrent=0
    App.Data.CaptchaCurrentURL=""
    App.Data.CaptchaCurrentType=""
    App.Data.CatpchaLastURL=""
    App.Core.CaptchaReq=null

    App.API.CaptchaSaveURL=function(type){
        App.Data.CaptchaURLs[type]=App.Data.CatpchaLastURL
    }
    App.Core.CaptchaLoadURL=function(){
        App.Data.CaptchaCurrentURL=App.Data.CaptchaURLs[App.Data.CaptchaCurrentType]
    }
    App.API.Captcha=function(type,final,fail){
        switch(type){
            case "zone":
            case "zonestart":
            case "zoneend":
                App.API.CaptchaSaveURL(type)
                break
        }
        let a=App.Automaton.Push(["core.state.captcha.captcha"],final)
        App.Data.CaptchaCurrent=0
        App.Data.CaptchaCurrentType=type
        if (fail){
            a.WithFailState(fail)
        }
        App.Next()
    }
    App.Core.CaptchaFullme=function(){
     App.NewCommand("fullme").Push()
     App.Next()
    }
    App.Core.CaptchaLoad=function(){
        App.Core.CaptchaReq=HTTP.New("GET",App.Data.CaptchaCurrentURL)
        App.Core.CaptchaReq.AsyncExecute("App.Core.CatpchaParseHTML")
    }
    App.Core.CatpchaParseHTML=function(name,id,code,data){
        if (code!=0){
            throw data
        }
        if (code==0){
            let result=imgsrcre.exec(App.Core.CaptchaReq.ResponseBody())
            if (result==null){
                throw "无法匹配图片地址"
            }
            let url="http://fullme.pkuxkx.net"+result[1]
            App.Core.CaptchaShow(url)
        }
    }
    App.Core.SendFullme=function(){
        App.Data.CaptchaURLs["fullme"]=""
        App.Send("fullme 1;fullme 1;fullme 1;fullme")
        App.Response("core","captchafullme")
    }
    App.RegisterCallback("core.captchafullme",function(){
        App.RaiseStateEvent("core.state.captcha.fullme")
    })
    App.Bind("Response.core.captchafullme","core.captchafullme")

    App.Core.CaptchaShow=function(url){
        let intro
        switch(App.Data.CaptchaCurrentType){
            case "zone":
                intro="忽略红色字符，地名部分必须准确，房间名识别不出可留空"
                break
            case "zonestart":
                intro="忽略红色字符，请输入开始位置的区域名，地名部分必须准确，房间名识别不出可留空"
                break
            case "zoneend":
                intro="忽略红色字符，请输入结束位置的区域名，地名部分必须准确，房间名识别不出可留空"
                break
            default:
                intro="忽略红色字符，如果是方向性文字，每对中括号内文字为一组"
        }
        let vp=Userinput.newvisualprompt("验证码",intro,url)
        vp.setrefreshcallback("App.Core.CatpchaRefresh")
        vp.publish("App.Core.OnCaptchaSubmit")
    }
    App.Core.CatpchaRefresh=function(name,id,code,data){
        if (code==0){
            App.Core.CaptchaLoad()
        }
    }
    App.Core.OnCaptchaSubmit=function(name,id,code,data){
        if (code==0 && data){
            App.Data.CaptchaCode=data
            App.RaiseStateEvent("captcha.submit")
        }
    }
    App.Core.CaptchaOnURL=function(name, output, wildcards){
        App.Data.CatpchaLastURL=wildcards[0]
    }
    App.Core.CaptchaFullmeLater=function(name, output, wildcards){
        App.Data.LastFullme=Now()-wildcards[2]*60000-wildcards[4]*6000
        App.Data.CatpchaLastURL=""
        App.Data.CaptchaURLs["fullme"]=""
    }

    App.Core.CaptchaOnGonghao=function(name, output, wildcards){
        App.API.CaptchaSaveURL("工号")
    }
    App.Core.CaptchaOnFullmeCmd=function(name, output, wildcards){
        App.API.CaptchaSaveURL("fullme")
    }
    App.Core.CaptchaOnSuccess=function(name, output, wildcards){
        App.RaiseStateEvent("captcha.success")
    }
    App.Core.CaptchaOnFail=function(name, output, wildcards){
        App.RaiseStateEvent("captcha.fail")
    }

    App.RegisterState(new (Include("core/state/captcha/captcha.js"))())
    App.RegisterState(new (Include("core/state/captcha/fullme.js"))())
    App.RegisterState(new (Include("core/state/captcha/fullmestart.js"))())

})(App)