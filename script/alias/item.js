(function(app) {
    app.Core.OnAliasItem = function (name, line, wildcards) {
        app.Send("l")
        app.Check(app.CheckLevelFull)
        app.Response("core", "produce", wildcards[0])
    }    
})(App)

