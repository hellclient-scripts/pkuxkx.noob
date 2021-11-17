(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateActiveExecute=function(){
        basicstate.call(this)
        this.ID="core.state.active.execute"
    }
    StateActiveExecute.prototype = Object.create(basicstate.prototype)
    StateActiveExecute.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        let active=app.GetContext("Active")
        app.Send(active.Command)
        app.ChangeState("ready")
    }
    return StateActiveExecute
})(App)