(function(App){
    App.Quest.WDJ.Zhengli={}
    App.Quest.WDJ.Zhengli.Start=function(){
        App.Commands([
            App.NewCommand("move",App.Options.NewPath("sw")),
            App.NewCommand("state","core.state.quest.wdj.zhengli.zhengli"),
            App.NewCommand("move",App.Options.NewPath("ne")),
        ]).Push()
        App.Next()
    }
    App.RegisterState(new (Include("core/state/quest/wdj/zhengli/zhengli.js"))())

})(App)