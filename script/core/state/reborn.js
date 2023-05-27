(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "reborn"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter = function (Context, newstatue) {
        world.Note("从死亡中苏醒")
        if (!App.Core.Death.OnReborn){
            App.Core.Death.Disconnect()
            return
        }
        App.Send("enter")
    }
    State.prototype.Leave = function (Context, newstatue) {
    }
    State.prototype.OnEvent = function (context, event, data) {
        switch (event) {
            case "core.conscious":
                App.Core.CheckBusy()
                break
            case "busy":
                world.DoAfterSpecial(1, 'App.Core.CheckBusy()', 12);
                break
            case "nobusy":
                App.Core.Death.Reborn()
                break
        }
    }
    return State
})(App)