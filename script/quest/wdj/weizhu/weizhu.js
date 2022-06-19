(function(App){
    App.Quest.WDJ.Weizhu={}
    App.Quest.WDJ.Weizhu.Start=function(){
        App.Raise("quest.set","五毒教任务喂猪")
        App.Commands([
            App.NewCommand("do","zhao kuang"),
            App.NewCommand("patrol",App.Options.NewPath("n;w")),
            App.NewCommand("do","zhao"),
            App.NewCommand("nobusy"),
            App.NewCommand("patrol",App.Options.NewPath("e;e;s")),
            App.NewCommand("do","wei"),
            App.NewCommand("nobusy"),
            App.NewCommand("patrol",App.Options.NewPath("w")),
        ]).Push()
        App.Next()
    }
})(App)