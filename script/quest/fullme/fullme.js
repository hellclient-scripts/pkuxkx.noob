(function(App){
    App.Quest.Fullme={}
    App.Quest.Fullme.SuccessFullmeDelay=15*60*1000
    App.Quest.Fullme.FullmeDelay=15*60*1000
    App.Quest.Fullme.Cooldown=function(){
        let delay=App.Data.IsLastFullmeSuccess?App.Quest.Fullme.SuccessFullmeDelay:App.Quest.Fullme.FullmeDelay
        App.Core.Quest.Cooldown("fullme",(App.Data.LastFullme+delay)-Now())
        App.Next()
    }
    App.Quest.Fullme.Start=function(){
        if (App.Data.Afk){
            App.Fail()
            return
        }
        if (Now()<(App.Data.LastFullme+App.Quest.Fullme.FullmeDelay)){
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