(function(app){
    app.InfoUIStop=function() {
        App.Stop()
    }
    app.RegisterAssistant("stop","终止行动",app.InfoUIStop,0)
})(App)