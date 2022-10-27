(function (App) {
    App.Quest.GetGem = {}
    App.Quest.GetGem.Pack={}
    App.Quest.GetGem.Pack.Data={}
    App.Quest.GetGem.Pack.Start=function(param){
        let target=param.trim()
        let cmd=(target=="")?"pack gem":"put gem in "+target
        App.PackGem(cmd)   
        Note("存放完毕，进入冷却1秒")
        App.Core.Quest.Cooldown("packgem",1000)
    }
    App.Quest.GetGem.Get={}
    App.Quest.GetGem.Get.Data={
        Pack:"",
        Commands:[],
    }
    App.Quest.GetGem.Get.Exec=function(){
        for(var i=0;i<App.Quest.GetGem.Get.Data.Commands.length;i++){
            App.Send(App.Quest.GetGem.Get.Data.Commands[i].toLowerCase())
        }
        App.Next()
    }
    App.Quest.GetGem.Get.Start=function(param){
        App.Quest.GetGem.Get.Data={
            Pack:"",
            Commands:[],
        }
        App.Commands([
            App.NewCommand("state","core.state.quest.getgem.getgem"),
            App.NewCommand("function",App.Quest.GetGem.Get.Exec),
        ]).Push()
        App.Next()
        
    }
    App.RegisterState(new (Include("core/state/quest/getgem/getgem.js"))())

})(App)