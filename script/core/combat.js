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
    App.Core.Combat.OnFlee=function(){
        App.RaiseStateEvent("combat.flee")
    }

    App.Core.Combat.OnFinish=function(){
        App.RaiseStateEvent("combat.finish")
    }
    App.Core.Combat.OnFighting=function(){
        App.RaiseStateEvent("combat.fighting")
    }
    App.Core.Combat.OnDisarm=function(){
        App.RaiseStateEvent("combat.disarm")
    }
    App.Core.Combat.OnWield=function(){
        App.RaiseStateEvent("combat.wield")
    }
    App.Core.Combat.OnBlocked=function(name, output, wildcards){
        let blocker=App.Info.Blockers[wildcards[0]]
        if (blocker && blocker.Exp<=App.Data.Exp){
            App.Send(blocker.Cmd)
            App.RaiseStateEvent("combat.blockkill",wildcards[0])
        }else{
            App.RaiseStateEvent("combat.blocked",wildcards[0])
        }
    }
    App.Core.Combat.ResetLooted=function(){
        App.Core.Combat.Looted={}
    }
    App.Core.Combat.Looted={}

    App.Core.Combat.OnKilled=function(name, output, wildcards){
        App.RaiseStateEvent("combat.killed",wildcards[0])
    }
    App.Core.Combat.NewBlockedCombat=function(){
        App.Core.Combat.Current=new combat()
        App.Core.Combat.Current.SetCommands(App.Core.Combat.GetCommands())
        App.Push(["core.state.combat.combat"])
        App.Next()
    }
    App.Core.Combat.Init=function(){
        App.Send(world.GetVariable("jifa_cmd"))
        App.Core.Weapon.ReWield()
        App.Send("yield no;set wimpy "+ App.Core.CombatMode.Current().GetWimpy())
    }
    App.Core.Combat.Rest=function(){
        App.NewCommand("rest").Push()
        App.Next()
    }
    App.Core.Combat.OnLoot=function(name, output, wildcards){
        App.Core.Combat.Looted[wildcards[0]]=true
        let cmd=App.Data.Room.LootCmds[wildcards[0]]
        if (cmd){
            App.Send(cmd)
        }
    }
    App.Core.Combat.CheckFighting=function(){
        App.Send("guard checkcombating")
    }
    App.Core.Combat.GetCommands=function(name){
        if (!name){
            name="combat"
        }
        let value=world.GetVariable(name)
        if (!value){
            value=world.GetVariable("combat")
        }
        return value
    }
    world.EnableTimer("App.Core.Combat.OnTick",false)

    App.RegisterState(new (Include("core/state/combat/combat.js"))())
    App.RegisterState(new (Include("core/state/combat/rest.js"))())
    App.RegisterState(new (Include("core/state/combat/kill.js"))())
})(App)