(function (App) {
    let patrol = Include("core/state/move/patrol.js")
    let State = function () {
        patrol.call(this)
        this.ID = "find"
    }
    State.prototype = Object.create(patrol.prototype)
    State.prototype.Enter = function (context, oldstatue) {
        let move = App.GetContext("Move")
        move.StartCmd="#l"
        move.StateOnStep = "finding"
        let data = move.Data
        if (data && data.NeedRoomDesc){
            move.StartCmd="unset brief;#l"
        }
        if (data && data.State) {
            move.StateOnStep = data.State
        }
        
        patrol.prototype.Enter.call(this, context, oldstatue)
    }
    return State
})(App)