(function(App){
    App.Quest.WDJ.Jiaoshui={}
    App.Quest.WDJ.Jiaoshui.Start=function(){
        App.Raise("quest.set","五毒教任务浇 菜")
        App.Commands([
            App.NewCommand("do","zhao tong"),
            App.NewCommand("patrol",App.Options.NewPath("n")),
            App.NewCommand("do","ti"),
            App.NewCommand("nobusy"),
            App.NewCommand("patrol",App.Options.NewPath("w")),
            App.NewCommand("do","jiao"),
            App.NewCommand("nobusy"),
            App.NewCommand("patrol",App.Options.NewPath("e;s")),
        ]).Push()
        App.Next()
    }
    App.Quest.WDJ.Jiaoshui.Start2=function(){
        App.Raise("quest.set","五毒教任务浇田")
        App.Commands([
            App.NewCommand("do","zhao tong"),
            App.NewCommand("patrol",App.Options.NewPath("n")),
            App.NewCommand("do","ti"),
            App.NewCommand("nobusy"),
            App.NewCommand("patrol",App.Options.NewPath("e")),
            App.NewCommand("do","jiao"),
            App.NewCommand("nobusy"),
            App.NewCommand("patrol",App.Options.NewPath("w;s")),
        ]).Push()
        App.Next()
    }
})(App)