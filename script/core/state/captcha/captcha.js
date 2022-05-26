(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateCaptcha=function(){
        basicstate.call(this)
        this.ID="core.state.captcha.captcha"

    }
    StateCaptcha.prototype = Object.create(basicstate.prototype)
    StateCaptcha.prototype.Enter=function(context,oldstatue){
        this.Type=app.GetContext("type")
        switch (this.Type){
            case "工号":
                this.Cmd="report "
                break
            default:
                this.Cmd="fullme "
        }
        app.Core.CaptchaLoadURL(this.Type)
        if (!app.Data.CaptchaCurrentURL){
            app.Fail()
            return
        }
        Request("captcha",app.Data.CaptchaCurrentURL)
        app.Core.CaptchaLoad()
    }
    StateCaptcha.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "captcha.submit":
                Userinput.hideall()
                let code=app.Data.CaptchaCode
                if (code){
                    app.Send(this.Cmd+code)
                }else{
                    app.Fail()
                }
                break
            case "captcha.success":
                app.Finish()
                break
            case "captcha.fail":
                app.Fail()
                break
        }
    }
    return StateCaptcha
})(App)