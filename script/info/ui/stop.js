(function(App){
    App.InfoUIStop=function() {
        App.Stop()
    }
    App.RegisterAssistant("stop","中止行动",App.InfoUIStop,0)
})(App)