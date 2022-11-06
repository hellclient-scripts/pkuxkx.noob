(function (App) {
    let fleere = /^([^【：『]{2,10})往(.*)落荒而逃了。$/
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.combat.combat"
        this.Groups = this.Groups.concat(["state.line","combat"])
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter = function (context, oldstatue) {
        App.Core.Combat.CaclStrategy()
        App.Data.Qishi=0
        Note("进入战斗，战斗ID为[ "+App.Core.Combat.Current.StrategyList.join(" , ")+" ],计算后的策略为["+App.Core.Combat.Current.Strategy+"]")
        App.Core.Combat.Current.LoadActions(GetVariable("combat"))
        App.Core.Combat.Toggle()
        App.Core.Weapon.Wield()
        App.Core.Combat.Perform()
        App.ChangeState("core.state.combat.combating")
    }
    return State
})(App)