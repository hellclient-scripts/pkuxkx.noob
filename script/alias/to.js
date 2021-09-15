(function (app) {
    app.Data.Alias = {}
    app.AliasPushData = function (name, data) {
        app.Data.Alias.To = data
    }
    app.AliasPopData = function (name) {
        let data = app.Data.Alias[name]
        delete (app.Data.Alias[name])
        return data
    }
    app.Alias.To = function (name, line, wildcards) {
        app.Send("l")
        app.Check(app.CheckLevelFull)
        app.AliasPushData("To", {
            Target: wildcards[0],
            Command: wildcards[2]

        })
        app.Response("alias", "to")
    }
    app.Bind("Response.alias.to", "alias.to.move")
    app.RegisterCallback("alias.to.move", function () {
        let data = app.AliasPopData("To")
        if (data) {
            app.NewMove("walk", data.Target, "core.send.send", { Data: data.Command }).Start()
        }
    })
})(App)