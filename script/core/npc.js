(function (App) {
    App.Core.NPC={}
    App.Core.NPC.OnNotHere=function(name, output, wildcards){
        App.RaiseStateEvent("core.nothere")
    }
    App.Core.NPC.OnNotFound=function(name, output, wildcards){
        App.RaiseStateEvent("core.npcnotfound")
    }
    App.Core.NPC.OnFound=function(name, output, wildcards){
        App.RaiseStateEvent("core.npcfound")
    }
    App.Core.NPC.FindHere=function(id){
        App.Send("kaichu "+id)
    }
})(App)