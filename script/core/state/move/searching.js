(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "searching"
        this.MoveState = "searchmoving"
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
            world.Note("搜索成功")
            App.Next()
            return
        }
        this.Move()
    }
    State.prototype.Enter = function (context, oldstatue) {
        this.Check()
    }
    State.prototype.Move = function () {
        App.NeedRoomDesc()
        App.ChangeState(this.MoveState)
    }
    return State
})(App)