(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.traversal.traversal"

    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter = function (context, oldstatue) {
        let data = App.Data.Traversal.Answer.split("||")
        if (data[1] != "") {
            App.Commands([
                App.NewCommand("to", App.Options.NewWalk(data[1])),
                App.NewCommand("nobusy"),
                App.NewCommand("find", App.Options.NewFind(data[3], App.Core.Traversal.GetGoal(), data[2])),
            ]).Push()
        } else {
            App.Commands([
                App.NewCommand("find", App.Options.NewFind(data[3], App.Core.Traversal.GetGoal(), data[2])),
            ]).Push()
        }
        App.Next()
    }
    return State
})(App)