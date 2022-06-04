(function(App){
    let imgsrcre=/<img src="\.([^"]+)"/
    App.Data.CaptchaURLs={} 
    App.Data.CaptchaCode=""
    App.Data.CaptchaCountSuccess=0
    App.Data.CaptchaCountFail=0
    App.Data.CaptchaCurrentURL=""
    App.Core.CatpchaLastURL=""
    App.Core.CaptchaReq=null

    App.API.CaptchaSaveURL=function(type){
        App.Data.CaptchaURLs[type]=App.Core.CatpchaLastURL
    }
    App.Core.CaptchaLoadURL=function(type){
        App.Data.CaptchaCurrentURL=App.Data.CaptchaURLs[type]
    }
    App.API.Captcha=function(type,final,fail){
        let a=App.Automaton.Push(["core.state.captcha.captcha"],final)
        if (fail){
            a.WithFailState(fail)
        }
        a.WithData("type",type)
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
    App.Core.CaptchaFullme=function(){
        App.Data.CaptchaURLs["fullme"]=""
        App.Send("fullme 1;fullme 1;fullme 1;fullme")
        App.Response("core","captchafullme")
    }
    App.RegisterCallback("core.captchafullme",function(){
        let a=App.Automaton.Push(["core.state.captcha.fullme"])
        a.WithData("index",0)
        App.Next()
    })
    App.Bind("Response.core.captchafullme","core.captchafullme")

    App.Core.CaptchaShow=function(url){
        let vp=Userinput.newvisualprompt("验证码","忽略红色字符，如果是方向性文字，每对中括号内文字为一组",url)
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
            App.OnStateEvent("captcha.submit")
        }
    }
    App.Core.CaptchaOnURL=function(name, output, wildcards){
        App.Core.CatpchaLastURL=wildcards[0]
    }
    App.Core.CaptchaFullmeLater=function(name, output, wildcards){
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
        App.OnStateEvent("captcha.success")
    }
    App.Core.CaptchaOnFail=function(name, output, wildcards){
        App.OnStateEvent("captcha.fail")
    }

    App.Core.CaptchaResponse=function(msgtype,id,data){
        let result=data.split("|")
        if (result.length!=2){
            return
        }
        if (App.Data.CaptchaCurrentURL==result[1]){
            App.Data.CaptchaCode=result[0]
            App.OnStateEvent("captcha.submit")
        }
    }

    App.RegisterState(new (Include("core/state/captcha/captcha.js"))())
    App.RegisterState(new (Include("core/state/captcha/fullme.js"))())

})(App)