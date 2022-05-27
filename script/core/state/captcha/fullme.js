(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateFullme=function(){
        basicstate.call(this)
        this.ID="core.state.captcha.fullme"

    }
    StateFullme.prototype = Object.create(basicstate.prototype)
    StateFullme.prototype.Enter=function(context,oldstatue){
        Note("准备fullme")
        Note("Fullme链接"+app.Data.CaptchaURLs["fullme"])
        if (app.Data.CaptchaURLs["fullme"]==""){
            Note("Fullme链接为空")
            app.Fail()
            return
        }
        let index=app.GetContext("index")
        if (index>=3){
            Note("超过重试次数")
            app.Fail()
            return
        }
        app.SetContext("index",index+1)
        app.API.Captcha("fullme",null,this.ID)
    }
    return StateFullme
})(App)