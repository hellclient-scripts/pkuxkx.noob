(function (app) {
    app.RegisterCallback("alias.delay.command", function (data) {
        let p=new Pipe(data)
        if (isNaN(p.Command)||(p.Command-0)<=0){
            throw "delay 的秒数必须为正数"
        }
        app.AliasPushData("Delay", p.Next)
        world.DoAfterSpecial((p.Command-0)/1000, 'App.Alias.OnDelay()', 12);
    })
    app.RegisterCommand("delay","alias.delay.command")

    app.Alias.OnDelay=function () {
        let data = app.AliasPopData("Delay")
        if (data) {
            app.Send(data)
        }
    }
})(App)