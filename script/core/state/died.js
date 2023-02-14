(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "died"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter = function (Context, newstatue) {
        world.Note("挂了")
    }
    State.prototype.Leave = function (Context, newstatue) {
    }
    State.prototype.OnEvent = function (context, event, data) {
        switch (event) {
            case "busy":
                world.DoAfterSpecial(1, 'App.Core.CheckBusy()', 12);
                break
            case "nobusy":
                App.Core.Death.Reborn()
                break
            case "core.conscious":
                App.Core.CheckBusy()
                break
        }
    }
    return State
})(App)