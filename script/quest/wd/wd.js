(function(App){
App.Quest.WD={}
App.Quest.WD.Data={
    Type:""
}
App.Quest.WD.Items=[
    App.Core.Puzzle.NewItem("liandan","炼丹任务"),
    App.Core.Puzzle.NewItem("zhen","阵法任务"),
    App.Core.Puzzle.NewItem("caiqi","采气任务"),
    App.Core.Puzzle.NewItem("chanting","诵经任务[需要事先准备路径]"),

]

App.Quest.WD.QuestionSuccess=App.Options.NewQuestion("chongxu daozhang","success")
App.Quest.WD.QuestionCancel=App.Options.NewQuestion("chongxu daozhang","cancel")
App.Quest.WD.QuestionQuest=App.Options.NewQuestion("chongxu daozhang","quest")
App.Load("quest/wd/liandan/liandan.js")
App.Load("quest/wd/zhen/zhen.js")
App.Load("quest/wd/caiqi/caiqi.js")
App.Load("quest/wd/chanting/chanting.js")
App.Load("quest/wd/xiake/xiake.js")
App.Quest.WD.Start=function(){
    App.Push(["core.state.quest.wd.wd"])
    App.Next()
}
App.RegisterState(new (Include("core/state/quest/wd/wd.js"))())
})(App)