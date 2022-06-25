(function(App){
    App.Quest.WD.Zhen={}
    App.Quest.WD.Zhen.NPC=""
    App.Quest.WD.Zhen.Free={}
    App.Quest.WD.Zhen.Start=function(){
        App.Raise("quest.set","武当新人任务过阵")
        App.ChangeState("core.state.quest.wd.zhen.zhen")
    }
    App.Quest.WD.Zhen.Items=[
        App.Core.Puzzle.NewItem("zouwei 金","没人走金，zouwei 金"),
        App.Core.Puzzle.NewItem("zouwei 木","没人走木，zouwei 木"),
        App.Core.Puzzle.NewItem("zouwei 水","没人走水，zouwei 水"),
        App.Core.Puzzle.NewItem("zouwei 火","没人走火，zouwei 火"),
        App.Core.Puzzle.NewItem("zouwei 土","没人走土，zouwei 土"),
    ]

    App.Quest.WD.Zhen.Locations={"nw":"se","w":"e","sw":"ne","se":"nw","e":"w","ne":"sw"}
    App.Quest.WD.Zhen.OnZouwei=function(name, output, wildcards){
        App.Quest.WD.Zhen.NPC=""
        App.Quest.WD.Zhen.Free={"金":true,"木":true,"水":true,"火":true,"土":true}
        App.RaiseStateEvent("quest.wd.zhen.zouwei")
    }
    App.Quest.WD.Zhen.OnZhenmove=function(name, output, wildcards){
        App.Quest.WD.Zhen.NPC=App.Quest.WD.Zhen.NPC+output+"\n"
        delete(App.Quest.WD.Zhen.Free[wildcards[2]])
        App.RaiseStateEvent("quest.wd.zhen.move")
    }
    App.Quest.WD.Zhen.OnSuccess=function(name, output, wildcards){
        App.RaiseStateEvent("quest.wd.zhen.success")
    }
    App.Quest.WD.Zhen.OnFail=function(name, output, wildcards){
        App.RaiseStateEvent("move.notallowed")
    }
    App.Quest.WD.Zhen.OnWrong=function(name, output, wildcards){
        App.RaiseStateEvent("quest.wd.zhen.wrong")
    }
    App.RegisterState(new (Include("core/state/quest/wd/zhen/zhen.js"))())
    App.RegisterState(new (Include("core/state/quest/wd/zhen/enter.js"))())
    App.RegisterState(new (Include("core/state/quest/wd/zhen/enterfail.js"))())
})(App)