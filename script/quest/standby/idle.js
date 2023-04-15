(function (App) {
App.Quest.Idle = {}
App.Quest.Idle.Location=""
App.Quest.Idle.Delay=0

App.Quest.Idle.Start=function(cmd){
    let data=cmd.split("::")
    if (data.length>0){
        App.Quest.Idle.Location=data[0]
    }
    if (data.length>1){
        App.Quest.Idle.Delay=data[1]-0
    }
    if (!App.Quest.Idle.Location){
        App.Quest.Idle.Location=App.GetSafeRoom()
    }
    if (!App.Quest.Idle.Delay){
        App.Quest.Idle.Delay=1
    }
    App.Commands([
        App.NewCommand('to', App.Options.NewWalk(App.Quest.Idle.Location)),
        App.NewCommand('delay',App.Quest.Idle.Delay),
        App.NewCommand("function",function(){
            App.Raise("quests.loop")
            App.Raise("core.looping")
            App.Next()
        })
    ]).Push()
    App.Next()
}
})(App)