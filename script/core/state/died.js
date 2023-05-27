(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "died"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter = function (Context, newstatue) {
        world.Note("挂了,等待苏醒")
    }
    State.prototype.Leave = function (Context, newstatue) {
    }
    State.prototype.OnEvent = function (context, event, data) {
        switch (event) {
            case "core.deathchoose":
                App.ChangeState("reborn")
                break
        }
    }
    return State
})(App)