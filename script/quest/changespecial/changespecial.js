(function (App) {
    const NeedUse = 1
    const NotNeedUse = 2
    let Specials = {
        "intellect": NotNeedUse,
        "perceive": NotNeedUse,
        "ironskin": NeedUse,
        "corporeity": NotNeedUse,
        "might": NeedUse,
        "might": NeedUse,
        "effectiveness": NeedUse,
        "agile": NeedUse,
        "chainless": NotNeedUse,
        "athanasy": NotNeedUse,
        "constitution": NotNeedUse,
        "energy": NotNeedUse,
        "greedy": NotNeedUse,
        "health": NeedUse,
        "lucky": NotNeedUse,
        "sociability": NotNeedUse,
        "spirituality": NeedUse,
    }

    App.Quest.ChangeSpecial = {}
    App.Quest.ChangeSpecial.Data = {}
    App.Quest.ChangeSpecial.Start = function (params) {
        let data = params.split(",")
        for (var i = 0; i < data.length; i++) {
            if (!Specials[data[i]]) {
                throw "特技[" + data[i] + "]未知"
            }
        }
        App.Quest.ChangeSpecial.Data = {}
        App.Quest.ChangeSpecial.Data.List = data
        if (!App.Data.SpecialLast) {
            App.Commands([
                App.NewCommand("do", "special"),
                App.NewCommand("nobusy"),
                App.NewCommand("function", App.Quest.ChangeSpecial.Check)
            ]).Push()
            App.Next()
            return
        }
        App.Quest.ChangeSpecial.Check()
    }
    App.Quest.ChangeSpecial.Check = function () {
        for (var i = 0; i < App.Quest.ChangeSpecial.Data.List.length; i++) {
            let id = App.Quest.ChangeSpecial.Data.List[i]
            let special = App.Data.Special[id]
            if (!special) {
                throw "特技[" + id + "]未学会"
            }
            if (!special.Enabled) {
                Note("需要重联激活特技 " + special.Label)
                App.Quest.ChangeSpecial.Change()
                return
            }
        }
        App.Fail()
    }
    App.Quest.ChangeSpecial.Change = function () {
        App.Commands([
            App.NewCommand("asset", "relogin"),
            App.NewCommand("nobusy"),
            App.NewCommand("to", App.Options.NewWalk(Object.keys(App.Info.HomeRooms))),
            App.NewCommand("nobusy"),
            App.NewCommand("function", function () {
                App.Core.BindLoginOnce("quest.changespecial.login")
                App.Send("quit;quit")
            }),
        ]).Push()
        App.Next()
    }
    App.Quest.ChangeSpecial.Login = function () {
        for (var id in App.Data.Special) {
            if (App.Data.Special[id].Enabled) {
                App.Send("special -" + id)
            }
        }
        for (var i = 0; i < App.Quest.ChangeSpecial.Data.List.length; i++) {
            let id = App.Quest.ChangeSpecial.Data.List[i]
            App.Send("special +" + id)
        }
        for (var i = 0; i < App.Quest.ChangeSpecial.Data.List.length; i++) {
            let id = App.Quest.ChangeSpecial.Data.List[i]
            if (Specials[id] == NeedUse) {
                App.Send("special " + id)
            }
        }
        App.Send("special")
        App.Next()
    }
    App.RegisterCallback("quest.changespecial.login", function () {
        App.Commands([
            App.NewCommand("to", App.Options.NewWalk(Object.keys(App.Info.HomeRooms))),
            App.NewCommand("nobusy"),
            App.NewCommand("do", "get all"),
            App.NewCommand("nobusy"),
            App.NewCommand("function",App.Quest.ChangeSpecial.Login),
            App.NewCommand("nobusy"),
        ]).Push()
        App.Next()
    })

})(App)