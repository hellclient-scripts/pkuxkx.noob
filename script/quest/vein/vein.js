(function (App) {
App.Quest.Vein = {}
App.Quest.Vein.Next="*"
App.Quest.Vein.Data={
}
App.Quest.Vein.CoolDown=function(){
    App.Core.Quest.Cooldown("dz",2*3600*1000)

}
App.Quest.Vein.Start=function(cmd){
    App.Quest.Vein.Data={}
    App.Commands([
        App.NewCommand('prepare',App.PrapareFull),
        App.NewCommand("to",App.Options.NewWalk(App.GetSafeRoom())),
        App.NewCommand("neili",20000),
        App.NewCommand("nobusy"),
        App.NewCommand("state","core.state.quest.vein.vein"),
        App.NewCommand("nobusy"),
    ]).Push()
    App.Next()
}
App.RegisterState(new (Include("core/state/quest/vein/vein.js"))())

})(App)