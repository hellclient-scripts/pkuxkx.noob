(function (App) {
    App.Quest.WDJ.Weizhu = {}
    App.Quest.WDJ.Weizhu.Start = function () {
        App.Commands([
            App.NewCommand("do", "zhao kuang"),
            App.NewCommand("move", App.Options.NewPath("n;w")),
            App.NewCommand("function", function () {
                App.SetRoomData("wdj.more", false)
                App.Next()
            }),
            App.NewCommand("roomonline", App.Quest.WDJ.Maofang.Online),
            App.NewCommand("do", "zhao"),
            App.NewCommand("nobusy"),
            App.NewCommand("function", App.Quest.WDJ.Weizhu.Check1),
        ]).Push()
        App.Next()
    }
    App.Quest.WDJ.Weizhu.Check1 = function () {
        if (App.GetRoomData("wdj.more")) {
            App.Commands([
                App.NewCommand("function", function () {
                    App.SetRoomData("wdj.more", false)
                    App.Next()
                }),
                App.NewCommand("do", "zhao"),
                App.NewCommand("nobusy"),
                App.NewCommand("function", App.Quest.WDJ.Weizhu.Check1),
            ]).Push()
        } else {
            App.Commands([
                App.NewCommand("move", App.Options.NewPath("e;e;s")),
                App.NewCommand("function", function () {
                    App.SetRoomData("wdj.more", false)
                    App.Next()
                }),
                App.NewCommand("roomonline", App.Quest.WDJ.Maofang.Online),    
                App.NewCommand("do", "wei"),
                App.NewCommand("nobusy"),
                App.NewCommand("function", App.Quest.WDJ.Weizhu.Check2),
            ]).Push()
        }
        App.Next()
    }
    App.Quest.WDJ.Weizhu.Check2 = function () {
        if (App.GetRoomData("wdj.more")) {
            App.Commands([
                App.NewCommand("function", function () {
                    App.SetRoomData("wdj.more", false)
                    App.Next()
                }),
                App.NewCommand("do", "wei"),
                App.NewCommand("nobusy"),
                App.NewCommand("function", App.Quest.WDJ.Weizhu.Check2),
            ]).Push()
        } else {
            App.Commands([
                App.NewCommand("move", App.Options.NewPath("w")),
            ]).Push()
        }
        App.Next()
    }

    App.Quest.WDJ.Weizhu.Online = function (line) {
        if (line == "你摘下了几把烂掉的菜叶，扔进大筐里。" || line == "这些猪好像还没吃饱。") {
            App.SetRoomData("wdj.more", true)
        }
    }

})(App)