(function (app) {
    app.RegisterCallback("alias.do.command", function (data) {
        let p=new Pipe(data)
        app.Send(p.Command)
        app.Send(p.Next)
    })
    app.RegisterCommand("do","alias.do.command")
})(App)