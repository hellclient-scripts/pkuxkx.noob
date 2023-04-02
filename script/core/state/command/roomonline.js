(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.command.roomonline"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.SetRoomOnline(App.GetContext("Online"))
        App.Next()
    }
    return State
})(App)