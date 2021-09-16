(function(app) {
    app.Core.OnAliasQueue = function (name, line, wildcards) {
        app.ExecuteTask("queue",line)
    }    
})(App)

