(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateActiveMove=function(){
        basicstate.call(this)
        this.ID="core.state.active.move"
        this.Move="walk"
    }
    StateActiveMove.prototype = Object.create(basicstate.prototype)
    StateActiveMove.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        let active=App.GetContext("Active")
        if (active.Location){
            App.NewMove(this.Move,active.Location).Start()
        }else{
            App.ChangeState("ready")
        }
    }
    return StateActiveMove
})(App)