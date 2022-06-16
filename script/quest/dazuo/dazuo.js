(function(App){
    App.Quest.Dazuo={}
    App.Quest.Dazuo.Max=0
    App.Quest.Dazuo.Check=function(){
        if (App.Quest.Dazuo.Max>0&&App.Data.HP["neili"]>=App.Quest.Dazuo.Max){
            App.Core.Quest.Cooldown("dazuo",900000)
            App.Fail()
            return
        }
        App.Next()
    }
    App.Quest.Dazuo.Command=function(){

        let num=App.Data.HP["neili"]*2-App.Data.HP["eff_neili"]
        if (num>App.Data.HP["eff_qixue"]){
            num=App.Data.HP["eff_qixue"]
        }
        if (num<10){
            num=10
        }
        App.Send("dazuo "+num)
        App.Next()
    }
    App.Quest.Dazuo.Start=function(max){
        App.Quest.Dazuo.Max=max?(max-0):0
        App.Commands([
            App.NewCommand('prepare',App.PrapareFull),
            App.NewCommand("function",App.Quest.Dazuo.Check),
            App.NewCommand("to",App.Options.NewWalk(App.GetSleepRooms())),
            App.NewCommand("nobusy"),
            App.NewCommand("function",App.Quest.Dazuo.Command),
            App.NewCommand("nobusy"),
        ]).Push()
        App.Next()
    }
    })(App)