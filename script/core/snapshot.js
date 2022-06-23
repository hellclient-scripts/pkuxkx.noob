(function(App){
    let snapshot=Include("include/option/snapshot.js")

    App.Core.Snapshot={}
    App.Core.Snapshot.Take=function(event,data){
        return new snapshot(event,data)
    }
    App.Core.Snapshot.Rollback=function(snap){
        App.Core.Automata=snap.Automaton
        App.StateContext.State=snap.State
        App.Data.State=snap.State.ID
        if (App.LoggingState){
            Note("State log:change state ["+snap.State.ID+"]")
        }
        App.Data.StateHistory.push(snap.State.ID)
        App.Data.StateHistory=App.Data.StateHistory.slice(-App.Data.StateHistoryMax)
        App.RaiseStateEvent("rollback")
        if (snap.StateEvent){
            App.RaiseStateEvent(snap.StateEvent,snap.EventData)
        }
    }

}(App))