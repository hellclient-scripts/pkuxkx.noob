(function(App){
    App.Quest.WD.Caiqi={}
    App.Quest.WD.Caiqi.Start=function(location,book,label,section){
        App.Push(["core.state.quest.wd.caiqi.caiqi"])
        App.Next()
    }
    App.RegisterState(new (Include("core/state/quest/wd/caiqi/caiqi.js"))())

})(App)