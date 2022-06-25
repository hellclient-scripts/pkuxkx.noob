(function(App){
    let combat=Include("include/combat.js")

    App.Core.Combat={}
    App.Core.Combat.Current=null
    App.Core.Combat.OnEscapeFail=function(name, output, wildcards){
        App.RaiseStateEvent("move.retry")
    }
    App.Core.Combat.OnTick=function(){
        App.RaiseStateEvent("combat.tick")
    }
    App.Core.Combat.OnFinish=function(){
        App.RaiseStateEvent("combat.finish")
    }
    App.Core.Combat.OnFighting=function(){
        App.RaiseStateEvent("combat.fighting")
    }
    App.Core.Combat.OnBlocked=function(name, output, wildcards){
        App.RaiseStateEvent("combat.blocked",wildcards[0])
    }
    App.Core.Combat.OnKilled=function(name, output, wildcards){
        App.RaiseStateEvent("combat.killed",wildcards[0])
    }
    App.Core.Combat.NewBlockedCombat=function(){
        App.Core.Combat.Current=new combat()
        App.Core.Combat.Current.SetCommands(world.GetVariable("combat"))
        App.Push(["core.state.combat.combat"])
        App.Next()
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
        App.NewCommand("rest").Push()
        App.Next()
    }
    App.Core.Combat.OnLoot=function(name, output, wildcards){
        let cmd=App.Data.Room.LootCmds[wildcards[0]]
        if (cmd){
            App.Send(cmd)
        }
    }
    
    world.EnableTimer("App.Core.Combat.OnTick",false)

    App.RegisterState(new (Include("core/state/combat/combat.js"))())
    App.RegisterState(new (Include("core/state/combat/rest.js"))())
})(App)