(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.captcha.captcha"

    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
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
    State.prototype.Leave=function(context,newstatue){
        Userinput.hideall()
    }
    State.prototype.OnEvent=function(context,event,data){
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
                App.Next()
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
    return State
})(App)