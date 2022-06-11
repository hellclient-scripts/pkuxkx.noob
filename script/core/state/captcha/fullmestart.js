(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.captcha.fullmestart"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "core.state.captcha.fullme":
                if (App.Data.CatpchaLastURL==""){
                    App.Fail()
                    return;
                }
                let a=App.Automaton.Push(["core.state.captcha.fullme"])
                a.WithData("index",0)
                App.Next()
                break
        }
    }
    State.prototype.Enter=function(context,oldstatue){
        App.Core.SendFullme()
    }
    return State
})(App)


