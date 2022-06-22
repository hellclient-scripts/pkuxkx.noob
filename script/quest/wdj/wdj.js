(function(App){
    App.Quest.WDJ={}
    App.Quest.WDJ.QuestionJob=App.Options.NewQuestion("gu shijian","job")
    App.Load("quest/wdj/weizhu/weizhu.js")
    App.Load("quest/wdj/jiaoshui/jiaoshui.js")
    App.Load("quest/wdj/maofang/maofang.js")
    App.Load("quest/wdj/zhengli/zhengli.js")
    App.Quest.WDJ.Items=[
        App.Core.Puzzle.NewItem("weizhu","喂猪任务"),
        App.Core.Puzzle.NewItem("jiaoshui","浇菜任务"),
        App.Core.Puzzle.NewItem("jiaoshui2","浇田任务"),
        App.Core.Puzzle.NewItem("maofang","茅房任务"),
        App.Core.Puzzle.NewItem("zhengli","整理书架任务"),
    
    ]
    
    App.Quest.WDJ.Start=function(){
        App.Push(["core.state.quest.wdj.wdj"])
        App.Next()
    }
    App.RegisterState(new (Include("core/state/quest/wdj/wdj.js"))())
    })(App)