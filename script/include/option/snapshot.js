(function(App){
    let Snapshot=function(event,data){
        this.Automaton=App.Automaton.Current()
        this.State=App.CurrentState()
        this.StateEvent=event
        this.EventData=data
    }
    return Snapshot
})(App)