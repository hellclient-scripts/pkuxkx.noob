(function(app){
    let imgsrcre=/<img src="\.([^"]+)"/
    app.Data.CaptchaURLs={} 
    app.Data.CaptchaCode=""
    app.Data.CaptchaCurrentURL=""
    app.Core.CatpchaLastURL=""
    app.Core.CaptchaReq=null

    app.API.CaptchaSaveURL=function(type){
        app.Data.CaptchaURLs[type]=app.Core.CatpchaLastURL
    }
    app.Core.CaptchaLoadURL=function(type){
        app.Data.CaptchaCurrentURL=app.Data.CaptchaURLs[type]
    }
    app.API.Captcha=function(type,final){
        app.Automaton.Push(final,["core.state.captcha.captcha"])
        app.SetContext("type",type)
        app.ChangeState("ready")
    }
    app.Core.CaptchaLoad=function(){
        app.Core.CaptchaReq=HTTP.New("GET",app.Data.CaptchaCurrentURL)
        app.Core.CaptchaReq.AsyncExecute("App.Core.CatpchaParseHTML")
    }
    app.Core.CatpchaParseHTML=function(name,id,code,data){
        if (code!=0){
            throw data
        }
        if (code==0){
            let result=imgsrcre.exec(app.Core.CaptchaReq.ResponseBody())
            if (result==null){
                throw "无法匹配图片地址"
            }
            let url="http://fullme.pkuxkx.net"+result[1]
            app.Core.CaptchaShow(url)
        }
    }
    app.Core.CaptchaShow=function(url){
        let vp=Userinput.newvisualprompt("验证码","忽略红色字符，如果是方向性文字，每对中括号内文字为一组",url)
        vp.setrefreshcallback("App.Core.CatpchaRefresh")
        vp.publish("App.Core.OnCaptchaSubmit")
    }
    app.Core.CatpchaRefresh=function(name,id,code,data){
        if (code==0){
            app.Core.CaptchaLoad()
        }
    }
    app.Core.OnCaptchaSubmit=function(name,id,code,data){
        if (code==0 && data){
            app.Data.CaptchaCode=data
            app.OnStateEvent("captcha.submit")
        }
    }
    app.Core.CaptchaOnURL=function(name, output, wildcards){
        app.Core.CatpchaLastURL=wildcards[0]
    }
    app.Core.OnCaptchaURLFail=function(name, output, wildcards){
        app.Data.FullmeUrl=""
    }

    app.Core.OnCaptchaGonghao=function(name, output, wildcards){
        app.API.CaptchaSaveURL("工号")
    }
    app.Core.OnFullmeCmd=function(name, output, wildcards){
        app.API.CaptchaSaveURL("fullme")
    }
    app.RegisterState(new (Include("core/state/captcha/captcha.js"))())
    app.Core.CaptchaResponse=function(msgtype,id,data){
        let result=data.split("|")
        if (result.length!=2){
            return
        }
        if (app.Data.CaptchaCurrentURL==result[1]){
            app.Data.CaptchaCode=result[0]
            app.OnStateEvent("captcha.submit")
        }
    }
})(App)