(function (app) {
    app.RegisterCallback("alias.afterbusy.command", function (data) {
        let p=new Pipe(data)
        app.CheckBusy("core.send.send",p.Next)
    })
    app.RegisterCommand("afterbusy","alias.afterbusy.command")
})(App)