(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.combat.rest"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter = function (context, oldstatue) {
        if (App.GetRoomData("state.rest.fail")){
            Note("放弃治疗")
            App.Next()
            return
        }
        App.SetRoomOnEvent(this.OnRoomEvent)
        Note("内力:" + App.Data.HP["eff_neili"] + " 气血:" + App.Core.PerQixue())
        let min=App.GetParamNeiliMin()
        if ((App.Data.HP["eff_neili"] < min)&&(min>=1)) {
            App.Core.Dazuo()
        } else if (App.Core.PerQixue() < App.GetNumberParam("heal_below") || App.Core.PerJing() < App.GetNumberParam("heal_below")) {
            if (App.Data.NoForce){
                App.Next();
                return
            }
            if (App.Core.PerJing() > App.Core.PerQixue()) {
                App.Send("do 10 yun heal")
            } else {
                App.Send("yun inspire")
            }
        } else {
            App.Next()
            return
        }
        App.Commands([
            App.NewCommand("nobusy"),
            App.NewCommand("do", "yun recover;yun regenerate"),
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
                App.SetRoomData("state.rest.fail",true)
                break
        }
    }
    return State
})(App)