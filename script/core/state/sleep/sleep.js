(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.sleep.sleep"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.Send("sleep")
    }
    State.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "core.sleep.wake":
                App.Next()
            break
            case "core.sleep.later":
                App.Next()
            break
            case "core.sleep.fail":
                App.Fail()
            break
            default:
                basicstate.prototype.OnEvent.call(this,context,event,data)
        }
    }
    return State
})(App)