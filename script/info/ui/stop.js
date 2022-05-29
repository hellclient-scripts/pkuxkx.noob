(function(app){
    app.InfoUIStop=function() {
        App.Stop()
    }
    app.RegisterAssistant("stop","中止行动",app.InfoUIStop,0)
})(App)