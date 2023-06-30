(function (App) {
    App.Quest.Biguan = {}
    App.Quest.Biguan.Location=""
    App.Quest.Biguan.Delay=0
    App.Quest.Biguan.Exit=""   
    App.Quest.Biguan.Start=function(cmd){
        if (App.Data.Wuxue.XiuxingDian==0){
            App.Core.Quest.Cooldown("biguan", 60*60*1000)
            App.Fail()
            return
        }
        let data=cmd.split("::")
        if (data.length>0){
            App.Quest.Biguan.Delay=data[0]-0
        }
        if (data.length>1){
            App.Quest.Biguan.Location=data[1]
        }
        if (data.length>2){
            App.Quest.Biguan.Exit=data[2]
        }

        if (!App.Quest.Biguan.Location){
            App.Quest.Biguan.Location="jxj"
        }
        if (!App.Quest.Biguan.Exit){
            App.Quest.Biguan.Exit=App.Data.HomeLoc
        }
        if (!App.Quest.Biguan.Delay){
            App.Quest.Biguan.Delay=60
        }
        App.Commands([
            App.NewCommand('to', App.Options.NewWalk(App.Quest.Biguan.Location)),
            App.NewCommand("do","biguan on"),
            App.NewCommand("planevent",App.Options.NewPlanEvent("#biguan",[])),
            App.NewCommand("do","biguan -b"),
            App.NewCommand('delay',App.Quest.Biguan.Delay),
            App.NewCommand("function",function(){
                App.Core.Wuxue.Check.Execute(true)
                App.Next()
            }),
            App.NewCommand("planevent",App.Options.NewPlanEvent("#biguanfinish",[])),
            App.NewCommand('to', App.Options.NewWalk(App.Quest.Biguan.Exit)),
            App.NewCommand("nobusy"),
            App.NewCommand("function",function(){
                App.Raise("quests.loop")
                App.Raise("core.looping")
                App.Next()
            })
        ]).Push()
        App.Next()
    }
    })(App)