(function (app) {
    app.RegisterCallback("alias.to.command", function (data) {
        let p=new Pipe(data)
        app.Send("l")
        app.Check(app.CheckLevelFull)
        app.AliasPushData("To", {
            Target: p.Command,
            Command: p.Next,

        })
        app.Response("alias", "to")

    })
    app.RegisterCommand("to","alias.to.command")
    app.Bind("Response.alias.to", "alias.to.move")
    app.RegisterCallback("alias.to.move", function () {
        let data = app.AliasPopData("To")
        if (data) {
            app.NewMove("walk", data.Target, "core.send.send", { Data: data.Command }).Start()
        }
    })
})(App)