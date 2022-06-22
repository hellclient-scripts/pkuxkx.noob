(function(App){
App.Quest.WD={}
App.Quest.WD.Type=""
App.Quest.WD.Data={}
App.Quest.WD.QuestionSuccess=App.Options.NewQuestion("chongxu daozhang","success")
App.Quest.WD.QuestionCancel=App.Options.NewQuestion("chongxu daozhang","cancel")
App.Quest.WD.QuestionQuest=App.Options.NewQuestion("chongxu daozhang","quest")
App.Load("quest/wd/liandan/liandan.js")
App.Load("quest/wd/zhen/zhen.js")
App.Load("quest/wd/caiqi/caiqi.js")
App.Load("quest/wd/chanting/chanting.js")
App.Quest.WD.Start=function(){
    App.Push(["core.state.quest.wd.wd"])
    App.Next()
}
App.RegisterState(new (Include("core/state/quest/wd/wd.js"))())
})(App)