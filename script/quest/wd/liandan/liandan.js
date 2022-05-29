(function(app){
    app.Quest.WD.Liandan={}
    app.Quest.WD.Liandan.Danlu="[]"
    app.Quest.WD.Liandan.Start=function(){
        app.ChangeState("core.state.quest.wd.liandan.zuo")
    }
    app.Quest.WD.Liandan.Items=[
        app.Core.Puzzle.NewItem("change H","黄色火焰 change H"),
        app.Core.Puzzle.NewItem("change M","紫色火焰 change M"),
        app.Core.Puzzle.NewItem("change L","红色火焰 change L"),
    ]
    app.Quest.WD.Liandan.OnDanlu=function(name, output, wildcards){
        app.Quest.WD.Liandan.Danlu=DumpOutput(19,2)
        app.OnStateEvent("quest.wd.liandan.danlu")
    }
    app.Quest.WD.Liandan.OnFail=function(name, output, wildcards){
        app.OnStateEvent("quest.wd.liandan.fail")
    }
    app.RegisterState(new (Include("core/state/quest/wd/liandan/statezuo.js"))())
})(App)