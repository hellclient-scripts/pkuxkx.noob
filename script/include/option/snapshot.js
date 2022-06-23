(function(App){
    let Snapshot=function(event,data){
        this.Automaton=[...App.Core.Automata]
        this.State=App.CurrentState()
        this.StateEvent=event
        this.EventData=data
    }
    return Snapshot
})(App)