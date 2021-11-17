(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateProduceExecute=function(){
        basicstate.call(this)
        this.ID="core.state.produce.check"
    }
    StateProduceExecute.prototype = Object.create(basicstate.prototype)
    StateProduceExecute.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        app.Send("i2")
        app.ResponseReady()
    }
    return StateProduceExecute
})(App)