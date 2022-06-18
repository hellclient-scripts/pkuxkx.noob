(function (App) {
    App.Core.NPC={}
    App.Core.NPC.OnNotHere=function(name, output, wildcards){
        App.RaiseStateEvent("core.nothere")
    }
})(App)