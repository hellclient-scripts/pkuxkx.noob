(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.combat.rest"
        this.Groups = this.Groups.concat(["state.line"])
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Online = function (line) {
        switch (line) {
            case "你是一个瞎子，看不见东西。":
            case "你现在是个瞎子,看不见东西。":
                world.DoAfterSpecial(1, 'App.Look()', 12);
                break
        }
    }
    State.prototype.Next = function () {
        App.Look()//检查是否目盲
    }
    State.prototype.Enter = function (context, oldstatue) {
        if (App.GetRoomData("combat.firstaid") && App.Core.Poison.NeedFirstAid()) {
            App.Commands([
                App.NewCommand("nobusy"),
                App.NewCommand("function", App.Core.Poison.FirstAid),
                App.NewCommand("nobusy"),
                App.NewCommand("state", this.ID)
            ]).Push()
            App.Next()
            return
        }
        if (App.Core.Poison.NeedChan()) {
            App.Commands([
                App.NewCommand("do", "eat chan;i2"),
                App.NewCommand("nobusy"),
                App.NewCommand("state", this.ID)
            ]).Push()
            App.Next()
            return
        }
        if (App.Core.Poison.NeedXuejie() && App.GetItemNumber("xuejie dan", true)) {
            App.Commands([
                App.NewCommand("do", "eat xuejie dan;i2"),
                App.NewCommand("nobusy"),
                App.NewCommand("delay", 1),
                App.NewCommand("state", this.ID)
            ]).Push()
            App.Next()
            return
        }
        if (App.GetRoomData("state.rest.fail")) {
            Note("放弃治疗")
            if (App.GetRoomData("combat.firstaid")) {
                App.Fail()
            } else {
                this.Next()
            }
            return
        }
        App.SetRoomOnEvent(this.OnRoomEvent)
        Note("内力:" + App.Data.HP["eff_neili"] + " 气血:" + App.Core.PerQixue())
        if (App.Core.Neili.NeedDazuo()){
            App.Core.Dazuo()
        } else if (App.Core.PerQixue() < App.GetNumberParam("heal_below") || App.Core.PerJing() < App.GetNumberParam("heal_below")) {
            if (App.Data.NoForce) {
                this.Next()
                return
            }
            if (App.Core.PerJing() > App.Core.PerQixue()) {
                if (App.Core.PerQixue() >= 51){
                    App.Send("do 10 yun heal;hp")
                }else{
                    App.Send("yun lifeheal " + GetVariable("id").trim() + ";hp")
                }
            } else {
                App.Send("yun inspire")
            }
        } else if (App.Data.HP["eff_qixue"] >= (App.Data.HP["qixue"] * 0.9)) {
            App.SetRoomData("combat.firstaid", null)
            this.Next()
            return
        }else{
            App.Send("hp")
        }
        App.Commands([
            App.NewCommand("nobusy"),
            App.NewCommand("do", "yun recover;yun regenerate;so recover"),
            App.NewCommand("nobusy"),
            App.NewCommand("delay", 1),
            App.NewCommand("state", this.ID)
        ]).Push()
        App.Next()
    }
    State.prototype.OnRoomEvent = function (event, data) {
        switch (event) {
            case "core.healfail":
            case "core.noaction":
                App.SetRoomData("state.rest.fail", true)
                break
        }
    }
    State.prototype.OnEvent = function (context, event, data) {
        switch (event) {
            case "line":
                this.Online(data)
                break
            case "move.onRoomObjEnd":
                App.Next()
                break
        }

    }

    return State
})(App)