(function(App) {
    App.Core.OnAliasQueue = function (name, line, wildcards) {
        App.ExecuteTask("queue",line)
    }    
})(App)

