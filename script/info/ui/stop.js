(function(App){
    App.InfoUIStart=function() {
        App.Core.Quest.StartVariable()
    }
    App.InfoUIStop=function() {
        App.Stop()
    }
    App.RegisterAssistant("start","开始任务",App.InfoUIStart,0)
    App.RegisterAssistant("stop","中止行动",App.InfoUIStop,10)
})(App)