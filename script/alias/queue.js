(function(App) {
    App.Core.OnAliasQueue = function (name, line, wildcards) {
        App.Raise("start")
        App.ExecuteTask("queue",line)
    }    
})(App)

