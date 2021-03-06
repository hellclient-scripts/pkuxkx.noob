(function (App) {
    let combat=Include("include/combat.js")
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.combat.kill"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let kill=App.GetContext("Kill")
        App.Core.Combat.Current=new combat()
        App.Core.Combat.Current.SetCommands(App.Core.Combat.GetCommands(kill.Type))
        App.Core.Combat.Current.SetOnline(kill.Online)
        App.Core.Combat.Current.SetYield(App.Data.Room.YieldYes)
        if (App.Data.Room.YieldYes){
            App.Send("yield yes")
        }
        App.Data.Room.YieldYes=false
        if (kill.Before){
            App.Send(kill.Before)    
        }
        if (kill.After){
            App.Core.Combat.Current.SetAfter(kill.After)
        }
        App.Core.Weapon.Wield()
        App.Send(kill.Cmd)
        App.ChangeState("core.state.combat.combat")
    }
    return State
})(App)