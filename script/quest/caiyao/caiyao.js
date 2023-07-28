(function (App) {
    App.Quest.Caiyao = {}
    let DropList = {
        "yuan zhi": true,
        "zhu sha": true,
        "fupen zi": true,
        "chang shan": true,
        "pipa ye": true,
        "jing jie": true,
        "lu hui": true,
        "xue jie": true,
        "gouqi": true,
        "dan nanxing": true,
        "bo he": true,
        "dang gui": true,
        "digu pi": true,
        "shechuang zi": true,
        "chuan bei": true,
        "dang shen": true,
        "he huan": true,
        "sang zhi": true,
        "yuxing cao": true,
        "ding xiang": true,
        "digu pi": true,
        "jixue teng": true,
        "zhe beimu": true,
        "fu ling": true,
        "sheng gancao": true,
    }
    App.Quest.Caiyao.Drop = function () {
        for (var i = 0; i < App.Data.Items.length; i++) {
            let id = App.Data.Items[i].ID.toLowerCase()
            if (DropList[id]) {
                App.Commands([
                    App.NewCommand("do", "drop "+id),
                    App.NewCommand("do", "i2"),
                    App.NewCommand("nobusy"),
                    App.NewCommand("function", App.Quest.Caiyao.Drop),
                ]).Push()
                break
            }
        }
        App.Next()
    }
    App.Quest.Caiyao.Zhuanzhi = function () {
        let path = App.Info.Patrols["药师专职"]
        App.Core.Traversal.New()
        App.Data.Traversal.Target = "*"
        App.Data.Traversal.Type = "herb"
        App.Data.Traversal.Answer = path
        App.Commands([
            App.NewCommand("function", App.Core.Traversal.Start),
            App.NewCommand("state", "core.state.quest.caiyao.caiyao"),
            App.NewCommand("do", "i2"),
            App.NewCommand("nobusy"),
            App.NewCommand("function", App.Quest.Caiyao.Drop),
        ]).Push()
        App.Next()
    }
    App.Quest.Caiyao.Start = function (areas) {
        if (!areas) {
            Note("采药区域不可为空")
            App.Fail()
        }
        let list = areas.split(",")
        let area = RandomList(list)
        App.Raise("quest.set", "采药")
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
            App.NewCommand("prepare", App.PrapareFull),
            App.NewCommand("item", App.Options.NewItem("yao chu")),
            App.NewCommand("function", App.Core.Traversal.Start),
            App.NewCommand("state", "core.state.quest.caiyao.caiyao"),
        ]).Push()
        App.Next()
    }
    App.RegisterState(new (Include("core/state/quest/caiyao/caiyao.js"))())

})(App)