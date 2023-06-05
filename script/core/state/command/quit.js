(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.command.quit"
    }
    let needleave = {
        "jxj": true
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter = function (context, oldstatue) {
        let bind = App.GetContext("Bind")
        let cmds = [App.NewCommand("function", function () {
            if (bind) {
                App.Core.BindLoginOnce(bind)
            }
            App.Next()
        }),
        App.NewCommand("do", "quit;quit")
        ]
        if (needleave[App.Data.Room.ID]) {
            cmds.unshift(
                App.NewCommand("move", App.Options.NewPath("#leaveid")),
            )
        }
        App.Commands(cmds).Push()
        App.Next()
    }
    return State
})(App)