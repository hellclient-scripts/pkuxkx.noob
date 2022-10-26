(function (App) {
    let combat = Include("include/combat.js")

    App.Core.Combat = {}
    App.Core.Combat.Current = null
    App.Core.Combat.OnEscapeFail = function (name, output, wildcards) {
        App.RaiseStateEvent("move.retry")
    }
    App.Core.Combat.OnTick = function () {
        App.RaiseStateEvent("combat.tick")
    }
    App.Core.Combat.OnFlee = function () {
        App.RaiseStateEvent("combat.flee")
    }

    App.Core.Combat.OnFinish = function () {
        App.RaiseStateEvent("combat.finish")
    }
    App.Core.Combat.OnFighting = function () {
        App.RaiseStateEvent("combat.fighting")
    }
    App.Core.Combat.OnDisarm = function () {
        App.RaiseStateEvent("combat.disarm")
    }
    App.Core.Combat.OnWield = function () {
        App.RaiseStateEvent("combat.wield")
    }
    App.Core.Combat.OnBlocked = function (name, output, wildcards) {
        let blocker = App.Info.Blockers[wildcards[0]]
        if (blocker) {
            if (blocker.Exp >= 0 && blocker.Exp <= App.Data.Exp) {
                App.RaiseStateEvent("combat.blockkill", blocker)
            } else {
                App.RaiseStateEvent("combat.blocked", blocker)
            }
        }
    }
    App.Core.Combat.ResetLooted = function () {
        App.Core.Combat.Looted = {}
    }
    App.Core.Combat.Looted = {}

    App.Core.Combat.OnKilled = function (name, output, wildcards) {
        App.RaiseStateEvent("combat.killed", wildcards[0])
    }
    App.Core.Combat.NewCounterCombat = function () {
        App.Core.Combat.Current = new combat(["counter"])
        App.Push(["core.state.combat.combat"])
        App.Next()
    }
    App.Core.Combat.NewBlockedCombat = function () {
        App.Core.Combat.Current = new combat(["blocker"])
        App.Push(["core.state.combat.combat"])
        App.Next()
    }
    App.Core.Combat.Init = function () {
        App.Send(world.GetVariable("jifa_cmd"))
        App.Core.Weapon.ReWield()
        App.Send("yield no;set wimpy " + App.Core.CombatMode.Current().GetWimpy())
    }
    App.Core.Combat.Rest = function () {
        App.NewCommand("rest").Push()
        App.Next()
    }
    App.Core.Combat.OnLoot = function (name, output, wildcards) {
        App.Core.Combat.Looted[wildcards[0]] = true
        App.Core.OnRoom.NPCDie(wildcards[0])
        let cmd = App.Data.Room.LootCmds[wildcards[0]]
        if (cmd) {
            App.Send(cmd)
        }
    }
    App.Core.Combat.CheckFighting = function () {
        App.Send("guard .")
    }
    App.DumpCombat=function(strategies){
        let old=App.Core.Combat.Current
        let current = new combat(strategies||[])
        App.Core.Combat.Current=current
        App.Core.Combat.CaclStrategy()
        current.LoadActions(GetVariable("combat"))
        Dump(current.Actions)
        App.Core.Combat.Current=old
    }
    App.Core.Combat.CaclStrategy = function () {
        let combat = App.Core.Combat.Current
        if (combat) {
            let strategies = {}
            for (var i = 0; i < combat.StrategyList.length; i++) {
                strategies[combat.StrategyList[i].trim()] = true
            }
            combat.Strategy = ""
            let combat_strategy = GetVariable("combat_strategy").split("\n")
            for (var i = 0; i < combat_strategy.length; i++) {
                let data = SplitN(combat_strategy[i], "=", 2)
                if (data.length < 2) {
                    continue
                }
                let list = data[0].split(",")
                for (var j = 0; j < list.length; j++) {
                    let name = list[j].trim()
                    if (strategies[name]) {
                        combat.Strategy = data[1]
                        return
                    }
                }
            }
        }
    }
    // App.Core.Combat.GetCommands = function (name) {
    //     if (!name) {
    //         name = "combat"
    //     }
    //     let value = world.GetVariable(name)
    //     if (!value) {
    //         value = world.GetVariable("combat")
    //     }
    //     return value
    // }
    App.Core.Combat.Intros = []
    App.Core.Combat.List = function () {
        for (var i = 0; i < App.Core.Combat.Intros.length; i++) {
            Note(App.Core.Combat.Intros[i])
        }
    }
    App.Core.Combat.Intro = function (name, comment) {
        App.Core.Combat.Intros.push(name + " : " + comment)
    }
    App.Core.Combat.Intro("blocker", "被拦路时进行的策略")
    App.Core.Combat.Intro("counter", "自动反击时进行的策略")
    world.EnableTimer("App.Core.Combat.OnTick", false)
    App.Core.Combat.Conditions = {}
    App.Core.Combat.CheckConditions = function (conditions) {
        for (var i = 0; i < conditions.length; i++) {
            let condition = conditions[i]
            let checker = App.Core.Combat.Conditions[condition.Type]
            if (checker == null) {
                return false
            }
            if (checker(condition.Data) == condition.Exclude) {
                return false
            }
        }
        return true
    }
    App.Core.Combat.Conditions["qishi"] = function (data) {
        if (!data) {
            data = 0
        }
        return App.Data.Qishi >= data
    }
    App.Core.Combat.ExecPerform = function (action) {
        if (!App.Core.Combat.CheckConditions(action.Conditions)) {
            return
        }
        switch (action.Command) {
            case "":
            case "#perfrom":
                App.Send(action.Data)
                break
        }
    }
    App.Core.Combat.Toggle = function () {
        let combat = App.Core.Combat.Current
        if (combat) {
            for (var i = 0; i < combat.Actions.length; i++) {
                App.Core.Combat.ExecToggle(combat.Actions[i])
            }
        }
    }
    App.Core.Combat.ExecToggle = function (action) {
        if (!App.Core.Combat.CheckConditions(action.Conditions)) {
            return
        }
        if (!action.Data) {
            return
        }
        switch (action.Command) {
            case "#toggleon":
                App.Toggle(action.Data, true)
                break
            case "#toggleoff":
                App.Toggle(action.Data, false)
                break
        }
    }
    App.Core.Combat.Touxi = function (target) {
        let combat = App.Core.Combat.Current
        if (combat) {
            for (var i = 0; i < combat.Actions.length; i++) {
                App.Core.Combat.ExecTouxi(combat.Actions[i], target)
            }
        }
    }
    App.Core.Combat.ExecTouxi = function (action, target) {
        if (!App.Core.Combat.CheckConditions(action.Conditions)) {
            return
        }
        switch (action.Command) {
            case "#touxi":
                App.Send(action.Data.replace("$1", target))
                break
        }
    }
    App.Core.Combat.Perform = function () {
        let combat = App.Core.Combat.Current
        if (combat) {
            let effqixue = App.Data.HP["eff_qixue"]
            let qixue = App.Data.HP["qixue"]
            let qixuecap = App.Data.HP["qixue_cap"]
            let currentqixue = effqixue / qixuecap
            let perqixue = qixue / qixuecap
            let effjing = App.Data.HP["eff_jing"]
            let jing = App.Data.HP["jing"]
            let jingcap = App.Data.HP["jing_cap"]
            let currentjing = effjing / jingcap
            let perjing = jing / jingcap
            if (
                currentqixue < combat.HaltCurrent ||
                perqixue < combat.HaltCurrent ||
                perqixue < combat.HaltWound ||
                currentjing < combat.HaltCurrent ||
                perjing < combat.HaltCurrent ||
                perjing < combat.HaltWound
            ) {
                App.Send("halt")
            }
            let recovery = combat.Recovery
            if (recovery < 0) {
                recovery = world.GetVariable("combat_yun_recover") - 0
            }
            if (recovery > 100) {
                Note("无效的 combat_yun_recover 变量，必须是0-100之间的整数")
            } else {
                if (recovery > 0 && (100 * effqixue / qixue < recovery)) {
                    App.Send("yun recover")
                }
            }
            if (combat.Disarmed) {
                App.Core.Weapon.Wield()
            }
            if (combat.Yield) {
                return
            }
            for (var i = 0; i < combat.Actions.length; i++) {
                App.Core.Combat.ExecPerform(combat.Actions[i])
            }
        }
    }
    App.RegisterState(new (Include("core/state/combat/combat.js"))())
    App.RegisterState(new (Include("core/state/combat/rest.js"))())
    App.RegisterState(new (Include("core/state/combat/kill.js"))())
})(App)