(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.move.start"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let move=App.GetContext("Move")
        App.LastMove=move
        App.SetContext("Move",move)
        App.ChangeState(move.Mode)
    }
    return State
})(App)