(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let StateFullme=function(){
        basicstate.call(this)
        this.ID="core.state.captcha.fullme"

    }
    StateFullme.prototype = Object.create(basicstate.prototype)
    StateFullme.prototype.Enter=function(context,oldstatue){
        Note("准备fullme")
        Note("Fullme链接"+App.Data.CaptchaURLs["fullme"])
        if (App.Data.CaptchaURLs["fullme"]==""){
            Note("Fullme链接为空")
            App.Next()
            return
        }
        let index=App.GetContext("index")
        if (index>=3){
            Note("超过重试次数")
            App.Fail()
            return
        }
        App.SetContext("index",index+1)
        App.API.Captcha({type:"fullme",timeout:5*60},null,this.ID)
    }
    return StateFullme
})(App)