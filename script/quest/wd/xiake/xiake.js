(function(App){
    App.Quest.WD.Xiake={}
    App.Quest.WD.Xiake.Question=App.Options.NewQuestion("cui laohan","麻烦")

    App.Quest.WD.Xiake.Start=function(){
        App.Raise("quest.set","武当新人侠客任务")
        App.Commands([
            App.NewCommand("combatinit"),
            App.NewCommand('prepare', App.PrapareFull),
            App.NewCommand("to",App.Options.NewWalk("wd-cw")),
            App.NewCommand("ask",App.Quest.WD.Xiake.Question),
            App.NewCommand("to",App.Options.NewWalk("wd-zl")),
            App.NewCommand("setloot",App.Data.Score.name+"的土匪头 get yin zhuozi from corpse"),
            App.NewCommand("rest"),
            App.NewCommand("powerup"),
            App.NewCommand("kill",App.Options.NewKill("kill "+world.GetVariable("id")+"'s tufeitou")),
            App.NewCommand("to",App.Options.NewWalk("wd-cw")),
            App.NewCommand("do","give yin zhuozi to cui laohan"),
        ]).Push()
        App.Next()
    }
})(App)