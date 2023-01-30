(function (App) {
    let fleere = /^([^【：『]{2,10})往(.*)落荒而逃了。$/
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.combat.combating"
        this.Groups = this.Groups.concat(["state.line","combat"])
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter = function (context, oldstatue) {
        world.ResetTimer("App.Core.Combat.OnTick")
        world.EnableTimer("App.Core.Combat.OnTick", true)
        App.Core.Combat.Ready()
        App.Core.Combat.CheckFighting()
        App.Data.Qishi=0
    }
    State.prototype.Leave = function (context, oldstatue) {
        world.EnableTimer("App.Core.Combat.OnTick", false)
    }
    State.prototype.Online = function (line) {
        if (App.Core.Combat.Current.FinishLine&&line==App.Core.Combat.Current.FinishLine){
            App.RaiseStateEvent("combat.finish")
            return
        }
        if (App.Core.Combat.Current.OnNpcFlee) {
            if (line.endsWith("落荒而逃了。")) {
                let result = line.match(fleere)
                if (result) {
                    Note("发现有人逃跑")
                    App.Core.Combat.Current.OnNpcFlee(result[1],result[2])
                }
            }
        }
    }
    
    State.prototype.Tick=function(){
        let msg=[]
        msg.push("当前策略["+App.Core.Combat.Current.Strategy+"]")
        msg.push("气势["+App.Data.Qishi+"]")
        msg.push(Math.floor(App.Core.Combat.Current.Duration())+"秒")
        Note(msg.join(","))
        if (App.Core.Poison.NeedXuejie()&&App.GetItemNumber("xuejie dan", true)) {
            App.Send("eat xuejie dan;i2")
        }
        App.Core.Combat.Perform()
        App.Core.Combat.CheckFighting()
    }
    State.prototype.OnEvent = function (context, event, data) {
        switch (event) {
            case "line":
                this.Online(data)
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
                this.Tick()
                break
            case "combat.finish":
                App.ChangeState("core.state.combat.finish")
                break
         break
        }
    }
    return State
})(App)