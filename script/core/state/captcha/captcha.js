(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateCaptcha=function(){
        basicstate.call(this)
        this.ID="core.state.captcha.captcha"

    }
    StateCaptcha.prototype = Object.create(basicstate.prototype)
    StateCaptcha.prototype.Enter=function(context,oldstatue){
        this.Type=App.GetContext("type")
        switch (this.Type){
            case "工号":
                this.Cmd="report "
                break
            default:
                this.Cmd="fullme "
        }
        App.Core.CaptchaLoadURL(this.Type)
        if (!App.Data.CaptchaCurrentURL){
            App.Fail()
            return
        }
        App.Raise("captcha")
        App.Core.CaptchaLoad()
    }
    StateCaptcha.prototype.Leave=function(context,newstatue){
        Userinput.hideall()
    }
    StateCaptcha.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "captcha.submit":
                let code=App.Data.CaptchaCode
                if (code){
                    App.Send(this.Cmd+code)
                }else{
                    App.Data.CaptchaCountFail++
                    App.Fail()
                }
                break
            case "captcha.success":
                App.Data.CaptchaCountSuccess++
                App.Finish()
                break
            case "captcha.fail":
                App.Data.CaptchaCountFail++
                App.Fail()
                break
            case "stop":
                App.Fail()
                break
        }
    }
    return StateCaptcha
})(App)