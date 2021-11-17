(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateActiveMove=function(){
        basicstate.call(this)
        this.ID="core.state.active.move"
    }
    StateActiveMove.prototype = Object.create(basicstate.prototype)
    StateActiveMove.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        let active=app.GetContext("Active")
        app.NewMove("walk",active.Location).Start()
    }
    return StateActiveMove
})(App)