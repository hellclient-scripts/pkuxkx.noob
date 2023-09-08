(function (App) {
App.Quest.Vein = {}
App.Quest.Vein.Next="*"
App.Quest.Vein.Data={
}
App.Quest.Vein.CoolDown=function(){
    App.Core.Quest.Cooldown("vein",2*3600*1000)
}
let Wudu=function(){
    Note("内力不足，尝试蛊师通脉")
    App.Next()
}
App.Quest.Vein.Start=function(cmd){
    App.Quest.Vein.Data={}
    cmds=[
        App.NewCommand('prepare',App.PrapareFull),
        App.NewCommand("to",App.Options.NewWalk(App.GetSafeRoom())),
    ]
    if (App.Data.Score["family"] == "五毒教"&&App.Data.HP["neili"]<10000){
        cmds.push(App.NewCommand("function",Wudu))
        cmds.push(App.NewCommand("neili",2000))
    }else{
        let n=20000
        let n2=Math.floor(App.Data.HP["neili"]*21/20)+1
        if (n2>n){
            n=n2
        }
        cmds.push(App.NewCommand("neili",n))
    }
    cmds=cmds.concat([
        App.NewCommand("nobusy"),
        App.NewCommand("state","core.state.quest.vein.vein"),
        App.NewCommand("nobusy"),        
    ])
    App.Commands(
        cmds
    ).Push()
    App.Next()
}
App.RegisterState(new (Include("core/state/quest/vein/vein.js"))())

})(App)