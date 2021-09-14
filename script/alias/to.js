(function(app){
    app.Alias.To=function(name, line, wildcards){
        app.NewMove("walk",wildcards[0]).Start()
    }
})(App)