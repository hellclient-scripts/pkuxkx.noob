(function (App) {
    let combat = Include("include/combat.js")
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.combat.kill"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter = function (context, oldstatue) {
        let kill = App.GetContext("Kill")
        App.Core.Combat.Current = new combat(kill.StrategyList)
        App.Core.Combat.Current.SetOnline(kill.Online)
        App.Core.Combat.Current.SetOnNpcFlee(kill.OnNpcFlee)
        App.Core.Combat.Current.SetFirstAid(kill.SetFirstAid)
        App.Core.Combat.Current.SetYield(App.Data.Room.YieldYes)
        App.Core.Combat.Current.SetHaltCurrent(kill.HaltCurrent)
        App.Core.Combat.Current.SetHaltAfter(kill.HaltAfter)

        App.Core.Combat.Current.SetHaltWound(kill.HaltWound)
        App.Core.Combat.CaclStrategy()
        App.Core.Combat.Current.LoadActions(GetVariable("combat"))
        App.Core.Combat.Toggle()
        App.Send("yun recover;yun regenerate")
        if (App.Data.Room.YieldYes) {
            App.Send("yield yes")
        } else {
            App.Send("yield no")
        }
        App.Data.Room.YieldYes = false
        if (kill.After) {
            App.Core.Combat.Current.SetAfter(kill.After)
        }
        if (kill.Wimpy>=0) {
            App.Core.Combat.Current.SetWimpy(kill.Wimpy)
        }
        if (!kill.Counter) {
            App.Core.Weapon.ReWield()
        }
        if (kill.Before) {
            App.Send(kill.Before)
        }
        if (kill.FinishLine) {
            App.Core.Combat.Current.FinishLine = kill.FinishLine
        }
        if (kill.Counter) {
            App.Core.Combat.Current.Counter = kill.Counter
        }
        if (kill.LastTarget){
            App.Core.Combat.Current.LastTarget=kill.LastTarget
        }
        if (kill.KillAgainCmd){
            App.Core.Combat.Current.KillAgainCmd=kill.KillAgainCmd
        }
        App.Core.Combat.Before()
        let cmd1 = kill.Cmd.split("\n")[0].trim()
        let cmd1data = SplitN(cmd1, " ", 2)
        if (cmd1data.length == 2) {
            switch (cmd1data[0]) {
                case "killall":
                    App.Core.Combat.Current.SetTarget(cmd1data[1])
                    App.Core.Combat.Current.SetKillCmd(cmd1data[0] + " " + cmd1data[1])
                case "kill":
                    App.Core.Combat.Current.SetTarget(cmd1data[1])
                    App.Core.Combat.Touxi(cmd1data[1])
                    break
            }
        }
        let cmds = []
        if (!kill.Counter) {
            cmds.push(App.NewCommand("nobusy"))
        }
        cmds = cmds.concat([
            App.NewCommand("do", kill.Cmd),
            App.NewCommand("state", "core.state.combat.combat"),
        ])
        App.Commands(cmds).Push()
        App.Next()
    }
    return State
})(App)