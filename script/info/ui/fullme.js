(function(app){
    app.InfoUIFullme=function() {
        app.Core.DoFullme()
    }
    app.RegisterAssistant("fullme","Fullme",app.InfoUIFullme,5)
})(App)