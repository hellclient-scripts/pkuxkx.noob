(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.traversal.start"

    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let move=App.GetContext("Move")
        move.StateOnStep="core.state.traversal.step"
        patrol.prototype.Enter.call(this,context,oldstatue)
    }
    return StateFullme
})(App)