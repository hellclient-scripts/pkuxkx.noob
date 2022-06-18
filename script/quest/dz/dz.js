(function(App){
    App.Quest.DZ={}
    App.Quest.DZ.Max=0
    App.Quest.DZ.Check=function(){
        if (App.Quest.DZ.Max>0&&App.Data.HP["neili"]>=App.Quest.DZ.Max){
            App.Core.Quest.Cooldown("dz",900000)
            App.Fail()
            return
        }
        App.Next()
    }
    App.Quest.DZ.Start=function(cmd){
        let data=cmd.split("::")
        max=data[0]
        location=data.length>1?data[1]:App.GetSafeRoom()
        App.Quest.DZ.Max=max?(max-0):0
        if (max){
            App.Raise("quest.set","Dz内力到"+max)
        }else{
            App.Raise("quest.set","Dz内力")
        }
        App.Commands([
            App.NewCommand('prepare',App.PrapareFull),
            App.NewCommand("function",App.Quest.DZ.Check),
            App.NewCommand("to",App.Options.NewWalk(location)),
            App.NewCommand("nobusy"),
            App.NewCommand("do","dz"),
            App.NewCommand("nobusy"),
        ]).Push()
        App.Next()
    }
    })(App)