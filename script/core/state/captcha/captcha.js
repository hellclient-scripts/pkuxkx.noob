(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.captcha.captcha"

    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        switch (App.Data.CaptchaCurrentType){
            case "工号":
                this.Cmd="report "
                break
            case "zone":
            case "zonestart":
            case "zoneend":
            case "tiangan":
            case "flowers":
            case "exits":
            case "zoneroom":
            case "2words":
                this.Cmd=null
                break
            default:
                this.Cmd="fullme "
        }
        App.Core.CaptchaLoadURL(App.Data.CaptchaCurrentType)
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
                    if (this.Cmd){
                        App.Send(this.Cmd+code)
                    }else{
                        App.Next()
                    }
                }else{
                    App.Data.CaptchaCountFail++
                    App.Next()
                }
                break
            case "focus":
                App.Core.CaptchaLoad()
                break
            case "captcha.success":
                App.Data.CaptchaCountSuccess++
                App.Next()
                break
            case "captcha.fail":
                App.Data.CaptchaCountFail++
                App.Fail()
                break
            case "captcha.other":
                App.Next()
                break
        }
    }
    return State
})(App)