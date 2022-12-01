(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.combat.finish"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Finish = function () {
        Note("战斗结束，用时：" + App.Core.Combat.Current.Duration() + "秒")
        let afterCombatCmd = GetVariable("after_combat_cmd")
        if (afterCombatCmd) {
            App.Send(afterCombatCmd)
        }
        let cmds = [App.NewCommand("delay", 1)]
        if (App.Core.Combat.Current.Yield) {
            cmds = cmds.concat([
                App.NewCommand("do", "yield no"),
            ])
        }
        if (App.Core.Combat.Current.FirstAid){
            App.SetRoomData("combat.firstaid",true)
        }
        if (App.Core.Combat.Current.After) {
            if (!App.Core.Combat.Current.Counter) {
                cmds.push(App.NewCommand("nobusy"))
            }
            cmds = cmds.concat([
                App.NewCommand("do", App.Core.Combat.Current.After),
            ])
        }
        if (!App.Core.Combat.Current.FinishLine) {
            cmds = cmds.concat([
                App.NewCommand("nobusy"),
                App.NewCommand("function", App.Core.Buff.AutoToggle),
                App.NewCommand("nobusy"),
                App.NewCommand("do", "yun recover"),
                App.NewCommand("state", "core.state.combat.rest"),
            ])
        }else{
            cmds = cmds.concat([
                App.NewCommand("function", App.Core.Buff.AutoToggle),
            ])
        }
        App.Commands(cmds).Push()
        App.Next()
    }
    State.prototype.Enter = function (context, oldstatue) {
        if (App.Core.Combat.Current.MustKill && App.Core.Combat.Current.KillCmd) {
            App.Core.NPC.FindHere(App.Core.Combat.Current.MustKill)
        } else {
            this.Finish()
        }

    }
    State.prototype.OnEvent = function (context, event, data) {
        switch (event) {
            case "core.npcfound":
                world.DoAfterSpecial(1, 'App.Core.Combat.KillAgain()', 12);
                break
            case "core.npcnotfound":
                this.Finish()
                break
        }
    }
    return State
})(App)