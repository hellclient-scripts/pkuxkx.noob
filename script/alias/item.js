(function(app) {
    App.Core.OnAliasItem = function (name, line, wildcards) {
        App.Send("l")
        App.Check(App.CheckLevelFull)
        App.Response("core", "produce", wildcards[0])
    }    
})(App)

