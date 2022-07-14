(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.command.setyieldyes"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let data=(App.GetContext("Yield")===false)
        App.SetRoomYieldYes(data)
        App.Next()
    }
    return State
})(App)