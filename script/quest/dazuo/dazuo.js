(function(App){
    App.Quest.Dazuo={}
    App.Quest.Dazuo.Command=function(){
        let num=App.Data.HP["neili"]*2-App.Data.HP["eff_neili"]
        if (num>App.Data.HP["qixue"]){
            num=App.Data.HP["qixue"]
        }
        if (num<10){
            num=10
        }
        App.Send("dazuo "+num)
        App.Next()
    }
    App.Quest.Dazuo.Start=function(){
        App.Commands([
            App.NewCommand('do',"yun recover"),
            App.NewCommand('prepare',App.PrapareFull),
            App.NewCommand("to",App.Options.NewWalk("wd")),
            App.NewCommand("nobusy"),
            App.NewCommand("function",App.Quest.Dazuo.Command),
            App.NewCommand("nobusy"),
        ]).Push()
        App.Next()
    }
    })(App)