(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.captcha.captcha"

    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.Raise("captcha")
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
            case "show":
                this.Cmd=null
                break
            default:
                this.Cmd="fullme "
        }
        SetPriority(2)
        App.Core.HUD.SetWarningMessage("需要打码")
        App.Core.CaptchaShow()
        world.DoAfterSpecial(App.Data.CaptchaTimeoutInSecounds, 'App.RaiseStateEvent("core.captcha.timeout")', 12);
    }
    State.prototype.Leave=function(context,newstatue){
        Userinput.hideall()
        SetPriority(0)
        App.Core.HUD.SetWarningMessage("")
        DeleteTemporaryTimers()
    }
    State.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "captcha.submit":
                App.SetAfk(false)
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
                App.Core.CaptchaShow()
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
            case "core.captcha.timeout":
                Note("等待打码超过"+App.Data.CaptchaTimeoutInSecounds+"秒，进入暂离模式")
                App.SetAfk(true)
                App.Next()
                break
        }
    }
    return State
})(App)