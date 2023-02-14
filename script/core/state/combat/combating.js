(function (App) {
    let fleere = /^([^【：『]{2,10})往(.*)落荒而逃了。$/
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.combat.combating"
        this.Groups = this.Groups.concat(["state.line", "combat"])
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter = function (context, oldstatue) {
        App.Core.Combat.Enemies.Reset()
        world.ResetTimer("App.Core.Combat.OnTick")
        world.EnableTimer("App.Core.Combat.OnTick", true)
        App.Core.Combat.Ready()
        App.Core.Combat.CheckFighting()
        App.Data.Qishi = 0
    }
    State.prototype.Leave = function (context, oldstatue) {
        world.EnableTimer("App.Core.Combat.OnTick", false)
    }
    State.prototype.Online = function (line) {
        App.Core.Perform.UpdateCooldown(line)
        if (App.Core.Combat.Current.FinishLine && line == App.Core.Combat.Current.FinishLine) {
            App.RaiseStateEvent("combat.finish")
            return
        }
        if (App.Core.Combat.Current.OnNpcFlee) {
            if (line.endsWith("落荒而逃了。")) {
                let result = line.match(fleere)
                if (result) {
                    Note("发现有人逃跑")
                    App.Core.Combat.Current.OnNpcFlee(result[1], result[2])
                }
            }
        }
    }

    State.prototype.Tick = function () {
        App.Core.Combat.Current.Target=App.Core.Combat.Enemies.Get()
        if (App.Core.Poison.NeedXuejie() && App.GetItemNumber("xuejie dan", true)) {
            App.Send("eat xuejie dan;i2")
        }
        App.Core.Combat.Perform()
        if (App.Core.Combat.Enemies.CheckNeedLook(10)) {
            App.Look()
        }
        let msg = []
        msg.push("当前策略[" + App.Core.Combat.Current.Strategy + "]")
        msg.push("气势[" + App.Data.Qishi + "]")
        msg.push("首选目标["+App.Core.Combat.Current.Target+"]")
        msg.push(Math.floor(App.Core.Combat.Current.Duration()) + "秒")
        Note(msg.join(","))
        let list = App.Core.Combat.Enemies.ListTags(3)
        for (var i = 0; i < list.length; i++) {
            Note("目标[" + list[i] + "]信息:[" + list.Tags.join(","))
        }
        Note("总目标:" + App.Core.Combat.Enemies.IDList.length + " " + App.Core.Combat.Enemies.FormatID(6))

        App.Core.Combat.CheckFighting()
    }
    State.prototype.OnGMCPFighting = function (datalist) {
        for (var i = 0; i < datalist.length; i++) {
            let data = datalist[i]
            if (data["enemy_out"]) {
                Note("Npc" + data.name + "[" + data.id + "]脱离战斗")
                App.Core.Combat.Enemies.RemoveID(data.id, data.id.split("#")[0])
                return
            }
            if (data["enemy_in"]) {
                Note("Npc" + data.name + "[" + data.id + "]加入战斗")
                App.Core.Combat.Enemies.InsertID(data.id, data.id.split("#")[0])
                return
            }
            if (data["id"]) {
                App.Core.Combat.Enemies.InsertID(data.id, data.id.split("#")[0])
                return
            }
        }
    }
    State.prototype.OnGMCPNpc = function (data) {
        if (data["eff_qi"] && data["eff_qi"] == -1) {
            Note("Npc" + data.name + "[" + data.id + "]死亡")
            App.Core.Combat.Enemies.RemoveID(data.id, data.id.split("#")[0])
        } else {
            if (data["id"]) {
                App.Core.Combat.Enemies.InsertID(data.id, data.id.split("#")[0])
                return
            }
        }
    }
    State.prototype.OnEvent = function (context, event, data) {
        switch (event) {
            case "line":
                this.Online(data)
                if (App.Core.Combat.Current.Online) {
                    App.Core.Combat.Current.Online(data)
                }
                break
            case "move.onRoomObjEnd":
                App.Core.Combat.Enemies.Update(App.Data.Room.Objs)
                break
            case "combat.disarm":
                App.Core.Combat.Current.Disarmed = true
                break
            case "combat.wield":
                App.Core.Combat.Current.Disarmed = false
                break
            case "combat.tick":
                this.Tick()
                break
            case "combat.finish":
                App.ChangeState("core.state.combat.finish")
                break
            case "combat.gmcp":
                this.OnGMCPFighting(data)
                break
            case "combat.npc":
                this.OnGMCPNpc(data)
                break
        }
    }
    return State
})(App)