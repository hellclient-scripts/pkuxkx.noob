(function(App){
    App.Core.Combat={}
    App.Core.Combat.OnEscapeFail=function(name, output, wildcards){
        App.RaiseStateEvent("move.retry")
    }
})(App)