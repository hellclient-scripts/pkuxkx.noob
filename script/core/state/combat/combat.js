(function (App) {
    let fleere = /^([^【：『]{2,10})往(.*)落荒而逃了。$/
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.combat.combat"
        this.Groups = this.Groups.concat(["state.line"])
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter = function (context, oldstatue) {
        world.ResetTimer("App.Core.Combat.OnTick")
        world.EnableTimer("App.Core.Combat.OnTick", true)
        App.Core.Weapon.Wield()
        App.Core.Combat.Current.Perform()
        App.Core.Combat.CheckFighting()
    }
    State.prototype.Leave = function (context, oldstatue) {
        world.EnableTimer("App.Core.Combat.OnTick", false)
    }
    State.prototype.Online = function (line) {
        if (App.Core.Combat.Current.OnNpcFlee) {
            if (line.endsWith("落荒而逃了。")) {
                let result = line.match(fleere)
                if (result) {
                    App.Core.Combat.Current.OnNpcFlee(result[1],result[2])
                }
            }
        }
    }
    // 鲁二往西落荒而逃了。

    State.prototype.OnEvent = function (context, event, data) {
        switch (event) {
            case "line":
                if (App.Core.Combat.Current.Online) {
                    App.Core.Combat.Current.Online(data)
                }
                break
            case "combat.disarm":
                App.Core.Combat.Current.Disarmed = true
                break
            case "combat.wield":
                App.Core.Combat.Current.Disarmed = false
                break
            case "combat.tick":
                // App.Send("checkbusy")
                App.Core.Combat.Current.Perform()
                App.Core.Combat.CheckFighting()
                break
            // case "nobusy":
            case "gmcp.nobusy":
                App.Core.Combat.Current.Perform()
                break
            case "combat.finish":
                let cmds = [App.NewCommand("delay", 1)]
                if (App.Core.Combat.Current.Yield) {
                    cmds = cmds.concat([
                        App.NewCommand("do", "yield no"),
                    ])
                }
                if (App.Core.Combat.Current.After) {
                    cmds = cmds.concat([
                        App.NewCommand("nobusy"),
                        App.NewCommand("do", App.Core.Combat.Current.After),
                    ])
                }
                cmds = cmds.concat([
                    App.NewCommand("nobusy"),
                    App.NewCommand("do", "yun recover"),
                    App.NewCommand("state", "core.state.combat.rest"),
                ])
                App.Commands(cmds).Push()
                App.Next()
                break
        }
    }
    return State
})(App)