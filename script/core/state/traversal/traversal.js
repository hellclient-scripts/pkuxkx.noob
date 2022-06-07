(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.traversal.traversal"

    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter = function (context, oldstatue) {
        let data = App.Data.Traversal.Answer.split("||")
        let a = App.NewActive(data[1], "", "core.state.traversal.arrive", true)
        a.Start()
    }
    return State
})(App)