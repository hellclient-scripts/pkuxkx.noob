(function(App){
    App.Quest.Fullme={}
    App.Quest.Fullme.Cooldown=function(){
        let delay=App.Data.IsLastFullmeSuccess?40*60*1000:15*60*1000
        App.Core.Quest.Cooldown("fullme",(App.Data.LastFullme+delay)-Now())
        App.Next()
    }
    App.Quest.Fullme.Start=function(){
        if (Now()<(App.Data.LastFullme+15*60*1000)){
            App.Quest.Fullme.Cooldown()
            return
        }
        App.Commands([
            App.NewCommand("fullme"),
            App.NewCommand("function",App.Quest.Fullme.Cooldown),
        ]).Push()
        App.Next()
    }
    })(App)