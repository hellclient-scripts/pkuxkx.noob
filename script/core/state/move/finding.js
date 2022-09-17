(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "finding"
        this.MoveState = "patroling"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Check = function () {
        let move = App.GetContext("Move")
        let data = move.Data
        if (data) {
            if (!data.Found) {
                data.Check()
            }
            if (!data.Found) {
                this.Move()
                return
            }
            App.Next()
            return
        }
        this.Move()
    }
    State.prototype.Enter = function (context, oldstatue) {
        this.Check()
    }
    State.prototype.Move = function () {
        App.ChangeState(this.MoveState)
    }
    return State
})(App)