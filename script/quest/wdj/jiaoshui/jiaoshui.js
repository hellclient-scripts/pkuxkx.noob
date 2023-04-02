(function (App) {
    App.Quest.WDJ.Jiaoshui = {}
    App.Quest.WDJ.Jiaoshui.Start = function () {
        App.Raise("quest.set", "五毒教任务浇菜")
        App.Commands([
            App.NewCommand("do", "zhao tong"),
            App.NewCommand("move", App.Options.NewPath("n")),
            App.NewCommand("do", "ti"),
            App.NewCommand("nobusy"),
            App.NewCommand("move", App.Options.NewPath("w")),
            App.NewCommand("function", function () {
                App.SetRoomData("wdj.more", false)
                App.Next()
            }),
            App.NewCommand("roomonline", App.Quest.WDJ.Jiaoshui.Online),
            App.NewCommand("do", "jiao"),
            App.NewCommand("nobusy"),
            App.NewCommand("function", App.Quest.WDJ.Jiaoshui.Check)
        ]).Push()
        App.Next()
    }
    App.Quest.WDJ.Jiaoshui.Check = function () {
        if (App.GetRoomData("wdj.more")) {
            App.Commands([
                App.NewCommand("move", App.Options.NewPath("e")),
                App.NewCommand("do", "ti"),
                App.NewCommand("nobusy"),    
                App.NewCommand("move", App.Options.NewPath("w")),
                App.NewCommand("function", function () {
                    App.SetRoomData("wdj.more", false)
                    App.Next()
                }),
                App.NewCommand("roomonline", App.Quest.WDJ.Jiaoshui.Online),
                App.NewCommand("do", "jiao"),
                App.NewCommand("nobusy"),
                App.NewCommand("function", App.Quest.WDJ.Jiaoshui.Check)    
            ]).Push()
        } else {
            App.Commands([
                App.NewCommand("move", App.Options.NewPath("e;s")),
            ]).Push()
        }
        App.Next()
    }
    App.Quest.WDJ.Jiaoshui.Online = function (line) {
        if (line == "你把水浇向菜地，还有些地需要更多水浇灌。"||line == "你把水浇向田垄，还有些地需要更多水浇灌。") {
            App.SetRoomData("wdj.more", true)
        }
    }
    App.Quest.WDJ.Jiaoshui.Start2 = function () {
        App.Raise("quest.set", "五毒教任务浇田")
        App.Commands([
            App.NewCommand("do", "zhao tong"),
            App.NewCommand("move", App.Options.NewPath("n")),
            App.NewCommand("do", "ti"),
            App.NewCommand("nobusy"),
            App.NewCommand("move", App.Options.NewPath("e")),
            App.NewCommand("function", function () {
                App.SetRoomData("wdj.more", false)
                App.Next()
            }),
            App.NewCommand("roomonline", App.Quest.WDJ.Jiaoshui.Online),
            App.NewCommand("do", "jiao"),
            App.NewCommand("nobusy"),
            App.NewCommand("function", App.Quest.WDJ.Jiaoshui.Check2)    
        ]).Push()
        App.Next()
    }
    App.Quest.WDJ.Jiaoshui.Check2 = function () {
        if (App.GetRoomData("wdj.more")) {
            App.Commands([
                App.NewCommand("move", App.Options.NewPath("w")),
                App.NewCommand("do", "ti"),
                App.NewCommand("nobusy"),    
                App.NewCommand("move", App.Options.NewPath("e")),
                App.NewCommand("function", function () {
                    App.SetRoomData("wdj.more", false)
                    App.Next()
                }),
                App.NewCommand("roomonline", App.Quest.WDJ.Jiaoshui.Online),
                App.NewCommand("do", "jiao"),
                App.NewCommand("nobusy"),
                App.NewCommand("function", App.Quest.WDJ.Jiaoshui.Check2)    
            ]).Push()
        } else {
            App.Commands([
                App.NewCommand("move", App.Options.NewPath("w;s")),
            ]).Push()
        }
        App.Next()
    }
})(App)