(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.command.planevent"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let event=App.GetContext("Event")
        App.Core.Plan.Execute(event.ID,event.Details)
        App.Next()
    }
    return State
})(App)