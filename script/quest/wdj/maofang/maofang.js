(function (App) {
    App.Quest.WDJ.Maofang = {}
    App.Quest.WDJ.Maofang.Start = function () {
        App.Commands([
            App.NewCommand("move", App.Options.NewPath("w")),
            App.NewCommand("do", "zhao 净桶"),
            App.NewCommand("nobusy"),
            App.NewCommand("move", App.Options.NewPath("e;se")),
            App.NewCommand("function", function () {
                App.SetRoomData("wdj.more", false)
                App.Next()
            }),
            App.NewCommand("roomonline", App.Quest.WDJ.Maofang.Online),
            App.NewCommand("do", "yao"),
            App.NewCommand("nobusy"),
            App.NewCommand("function", App.Quest.WDJ.Maofang.Check)
        ]).Push()
        App.Next()
    }
    App.Quest.WDJ.Maofang.Online = function (line) {
        if (line == "你打开便桶，将其中的黄白之物舀进净桶。便桶还没有清空。") {
            App.SetRoomData("wdj.more", true)
        }
    }
    App.Quest.WDJ.Maofang.Check = function () {
        if (App.GetRoomData("wdj.more")) {
            App.Commands([
                App.NewCommand("function", function () {
                    App.SetRoomData("wdj.more", false)
                    App.Next()
                }),
                App.NewCommand("do", "yao"),
                App.NewCommand("nobusy"),
                App.NewCommand("function", App.Quest.WDJ.Maofang.Check)
            ]).Push()
        } else {
            App.Commands([
                App.NewCommand("move", App.Options.NewPath("nw;w")),
                App.NewCommand("do", "dao"),
                App.NewCommand("nobusy"),
                App.NewCommand("move", App.Options.NewPath("e")),
            ]).Push()
        }
        App.Next()
    }
})(App)