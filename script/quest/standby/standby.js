(function (App) {
App.Quest.Standby = {}
App.Quest.Standby.Location=""
App.Quest.Standby.Delay=0

App.Quest.Standby.Start=function(cmd){
    let data=cmd.split("::")
    if (data.length>0){
        App.Quest.Standby.Location=data[0]
    }
    if (data.length>1){
        App.Quest.Standby.Delay=data[1]-0
    }
    if (!App.Quest.Standby.Location){
        App.Quest.Standby.Location=App.GetSafeRoom()
    }
    if (!App.Quest.Standby.Delay){
        App.Quest.Standby.Delay=60
    }
    App.Commands([
        App.NewCommand('prepare',App.PrapareFull),
        App.NewCommand('to', App.Options.NewWalk(App.Quest.Standby.Location)),
        App.NewCommand('delay',App.Quest.Standby.Delay),
        App.NewCommand("function",function(){
            App.Raise("quests.loop")
            App.Raise("core.looping")
            App.Next()
        })
    ]).Push()
    App.Next()
}
})(App)