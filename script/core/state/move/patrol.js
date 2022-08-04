(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let patrol = Include("include/patrol.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "patrol"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter = function (context, oldstatue) {
        basicstate.prototype.Enter.call(this, context, oldstatue)
        this.Start()
    }
    State.prototype.Start = function () {
        let move = App.GetContext("Move")
        move.Context = new patrol(move.Target)
        if (!move.StartCmd) {
            move.StartCmd = "l"
        }
        this.Patroling()
    }
    State.prototype.Patroling = function () {
        App.ChangeState("patroling")
    }
    return State
})(App)