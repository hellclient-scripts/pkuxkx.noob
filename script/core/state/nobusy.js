(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "nobusy"
        this.Waiting = false
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.OnEvent = function (context, event, data) {
        switch (event) {
            case "busy":
                world.ResetTimer("busy_retry")
                world.DoAfterSpecial(1, 'App.Core.CheckBusy()', 12);
                break
            case "nobusy":
                App.Next()
                break
        }
    }
    State.prototype.Enter = function (context, oldstatue) {
        basicstate.prototype.Enter.call(this, context, oldstatue)
        world.ResetTimer("busy_retry")
        world.EnableTimer("busy_retry", true)
        if (App.GetContext("WaitOK")) {
            App.Core.CheckBusyWaitOK()
        } else {
            App.Core.CheckBusy()
        }
    }
    State.prototype.Leave = function (context, oldstatue) {
        world.EnableTimer("busy_retry", false)
    }
    return State
})(App)