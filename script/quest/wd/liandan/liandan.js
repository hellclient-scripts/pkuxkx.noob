(function(App){
    App.Quest.WD.Liandan={}
    App.Quest.WD.Liandan.Danlu="[]"
    App.Quest.WD.Liandan.Start=function(){
        App.ChangeState("core.state.quest.wd.liandan.liandan")
    }
    App.Quest.WD.Liandan.Items=[
        App.Core.Puzzle.NewItem("change H","黄色火焰 change H"),
        App.Core.Puzzle.NewItem("change M","紫色火焰 change M"),
        App.Core.Puzzle.NewItem("change L","红色火焰 change L"),
        App.Core.Puzzle.NewItem("","绿色火焰 不操作"),

    ]
    App.Quest.WD.Liandan.OnDanlu=function(name, output, wildcards){
        App.Quest.WD.Liandan.Danlu=DumpOutput(19)
        App.RaiseStateEvent("quest.wd.liandan.danlu")
    }
    App.Quest.WD.Liandan.OnFail=function(name, output, wildcards){
        App.RaiseStateEvent("quest.wd.liandan.fail")
    }
    App.Quest.WD.Liandan.OnSuccess=function(name, output, wildcards){
        App.RaiseStateEvent("quest.wd.liandan.success")
    }
    App.RegisterState(new (Include("core/state/quest/wd/liandan/liandan.js"))())
    App.RegisterState(new (Include("core/state/quest/wd/liandan/zuo.js"))())

})(App)