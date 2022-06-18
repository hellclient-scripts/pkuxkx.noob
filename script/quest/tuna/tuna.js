(function(App){
    App.Quest.Tuna={}
    App.Quest.Tuna.Max=0
    App.Quest.Tuna.Check=function(){
        if (App.Quest.Tuna.Max>0&&App.Data.HP["neili"]>=App.Quest.Tuna.Max){
            App.Core.Quest.Cooldown("dazuo",900000)
            App.Fail()
            return
        }
        App.Next()
    }
    App.Quest.Tuna.Command=function(){
        let num=App.Data.HP["jingli"]*2-App.Data.HP["eff_jingli"]
        let cap=Math.floor(App.Data.HP["eff_jing"]*0.9)
        if (num>cap){
            num=cap
        }
        if (num<10){
            num=10
        }
        App.Send("tuna "+num)
        App.Next()
    }
    App.Quest.Tuna.Start=function(cmd){
        let data=cmd.split("::")
        max=data[0]
        location=data.length>1?data[1]:App.GetSleepRooms()
        App.Quest.Tuna.Max=max?(max-0):0
        if (max){
            App.Raise("quest.set","Tuna精力到"+max)
        }else{
            App.Raise("quest.set","Tuna精力")
        }
        App.Commands([
            App.NewCommand('prepare',App.PrapareFull),
            App.NewCommand("function",App.Quest.Tuna.Check),
            App.NewCommand("to",App.Options.NewWalk(location)),
            App.NewCommand("nobusy"),
            App.NewCommand("function",App.Quest.Tuna.Command),
            App.NewCommand("nobusy"),
        ]).Push()
        App.Next()
    }
    })(App)