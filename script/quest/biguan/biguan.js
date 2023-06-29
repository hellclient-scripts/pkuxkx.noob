(function (App) {
    App.Quest.Biguan = {}
    App.Quest.Biguan.Location=""
    App.Quest.Biguan.Delay=0
    App.Quest.Biguan.Exit=""
    App.Quest.Biguan.Command=""
    App.Quest.Biguan.Final=""
    
    App.Quest.Biguan.Start=function(cmd){
        if (App.Data.Wuxue.XiuxingDian==0){
            App.Core.Quest.Cooldown("biguan", 60*60*1000)
            App.Fail()
            return
        }
        let data=cmd.split("::")
        App.Quest.Biguan.Command=""
        App.Quest.Biguan.Final=""
        if (data.length>0){
            App.Quest.Biguan.Command=data[0]
        }
        if (data.length>0){
            App.Quest.Biguan.Final=data[1]
        }
        if (data.length>2){
            App.Quest.Biguan.Location=data[2]
        }
        if (data.length>3){
            App.Quest.Biguan.Exit=data[3]
        }
        if (data.length>4){
            App.Quest.Biguan.Delay=data[4]-0
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
            App.NewCommand("do",App.Quest.Biguan.Command),
            App.NewCommand("do","biguan -b"),
            App.NewCommand('delay',App.Quest.Biguan.Delay),
            App.NewCommand("function",function(){
                App.Core.Wuxue.Check.Execute(true)
                App.Next()
            }),
            App.NewCommand("do",App.Quest.Biguan.Final),
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