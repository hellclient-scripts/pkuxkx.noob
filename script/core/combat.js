(function(App){
    App.Core.Combat={}
    App.Core.Combat.Current=null
    App.Core.Combat.OnEscapeFail=function(name, output, wildcards){
        App.RaiseStateEvent("move.retry")
    }
    App.Core.Combat.OnTick=function(){
        App.RaiseStateEvent("combat.tick")
    }
    App.Core.Combat.OnBlocked=function(name, output, wildcards){
        App.RaiseStateEvent("combat.blocked",wildcards[0])
    }
    App.Core.Combat.Init=function(){
        App.Send(world.GetVariable("jifa_cmd"))
        App.Send("set wimpy "+ App.Core.CombatMode.Current().GetWimpy())
    }
    App.Core.Combat.Prepare=function(){
        App.Send(world.GetVariable("combat_prepare_cmd"))
        App.Next()
    }
    App.Core.Combat.Rest=function(){
        App.Next()
    }
    world.EnableTimer("App.Core.Combat.OnTick",false)
})(App)