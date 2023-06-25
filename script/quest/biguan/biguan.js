(function (App) {
    App.Quest.Biguan = {}
    App.Quest.Biguan.Location=""
    App.Quest.Biguan.Delay=0
    
    App.Quest.Biguan.Start=function(cmd){
        if (App.Data.Wuxue.XiuxingDian==0){
            App.Core.Quest.Cooldown("biguan", 60*60*1000)
            App.Fail()
            return
        }
        let data=cmd.split("::")
        if (data.length>0){
            App.Quest.Biguan.Location=data[0]
        }
        if (data.length>1){
            App.Quest.Biguan.Delay=data[1]-0
        }
        if (!App.Quest.Biguan.Location){
            App.Quest.Idle.Location="jxj"
        }
        if (!App.Quest.Idle.Delay){
            App.Quest.Idle.Delay=30
        }
        App.Commands([
            App.NewCommand('to', App.Options.NewWalk(App.Quest.Idle.Location)),
            App.NewCommand("do","biguan -b"),
            App.NewCommand('delay',App.Quest.Idle.Delay),
            App.NewCommand("function",function(){
                App.Core.Wuxue.Check.Execute(true)
                App.Next()
            }),
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