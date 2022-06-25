(function(App){
    App.Core.Combat={}
    App.Core.Combat.Current=null
    App.Core.Combat.OnEscapeFail=function(name, output, wildcards){
        App.RaiseStateEvent("move.retry")
    }
    App.Core.Combat.Init=function(){
        App.Next()
    }
    App.Core.Combat.Prepare=function(){
        App.Next()
    }
    App.Core.Combat.Rest=function(){
        App.Next()
    }
})(App)