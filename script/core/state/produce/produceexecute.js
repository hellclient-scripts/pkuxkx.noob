(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateProduceExecute=function(){
        basicstate.call(this)
        this.ID="core.state.produce.execute"
    }
    StateProduceExecute.prototype = Object.create(basicstate.prototype)
    StateProduceExecute.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        let item=app.GetContext("Item")
        app.Send(item.Command)
        app.ChangeState("ready")
    }
    return StateProduceExecute
})(App)