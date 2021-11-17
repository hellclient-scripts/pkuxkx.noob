(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateProduceMove=function(){
        basicstate.call(this)
        this.ID="core.state.produce.move"
    }
    StateProduceMove.prototype = Object.create(basicstate.prototype)
    StateProduceMove.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        let item=app.GetContext("Item")
        app.NewMove("walk",item.Location).Start()
    }
    return StateProduceMove
})(App)