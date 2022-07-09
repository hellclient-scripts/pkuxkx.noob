(function(App){
    App.Quest.Caiyao={}
    App.Quest.Caiyao.Start=function(areas){
        if (!areas){
            Note("采药区域不可为空")
            App.Fail()
        }
        let list=areas.split(",")
        let area=RandomList(list)
        App.Raise("quest.set","采药")
        App.Push(["core.state.quest.caiyao.caiyao"])
        let path = App.Info.Patrols[area]
        if (!path) {
            Note("无效的区域[" + area + "]")
            App.Fail()
            return
        }

        App.Core.Traversal.New()
        App.Data.Traversal.Target = "*"
        App.Data.Traversal.Type = "herb"
        App.Data.Traversal.Answer = path
        App.Commands([
            App.NewCommand("prepare",App.PrapareFull),
            App.NewCommand("item",App.Options.NewItem("yao chu")),
            App.NewCommand("function", App.Core.Traversal.Start),
            App.NewCommand("state", "core.state.quest.caiyao.caiyao"),
        ]).Push()
        App.Next()
    }
    App.RegisterState(new (Include("core/state/quest/caiyao/caiyao.js"))())

})(App)