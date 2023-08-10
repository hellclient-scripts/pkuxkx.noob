(function (App) {
    App.Quest.CleanBaofu = {}
    App.Quest.CleanBaofu.Start=function(){
        App.Quest.CleanBaofu.Check()
    }
    App.Quest.CleanBaofu.OnlineClean=function(line){
        if (line=="那里面没有任何东西。"){
            App.SetRoomData("quests.cleanbaofu.empty",true)
        }
    }
    App.Quest.CleanBaofu.Check=function(){
        if (App.GetRoomData("quests.cleanbaofu.empty")){
            App.SetRoomData("quests.cleanbaofu.empty",false)
            if (App.GetItemNumber("bao fu", true)>1){
                App.Commands([
                    App.NewCommand("to", App.Options.NewWalk(App.Info.RoomSell)),
                    App.NewCommand("do", "sell bao fu;i2"),
                    App.NewCommand("nobusy"),
                    App.NewCommand("function",App.Quest.CleanBaofu.Clean),
                ]).Push()
            }
            // Finished
        }else{
            Note("包袱未清空")
            App.Commands([
                App.NewCommand("delay",2),
                App.NewCommand("do","i2"),
                App.NewCommand("nobusy"),
                App.NewCommand("function",App.Quest.CleanBaofu.Clean),
            ]).Push()
        }
        App.Next()
    }
    App.Quest.CleanBaofu.Clean=function(){
        if (App.GetItemNumber("bao fu", true)<1){
            App.Next()
            return
        }
        App.Commands([
            App.NewCommand("function",function(){
                App.SetRoomData("quests.cleanbaofu.empty",false)
                App.SetRoomOnline(App.Quest.CleanBaofu.OnlineClean)
                App.Next()
            }),
            App.NewCommand("do","get all from bao fu"),
            App.NewCommand("nobusy"),
            App.NewCommand("roomonline",null),
            App.NewCommand("do","i2"),
            App.NewCommand("nobusy"),
            App.NewCommand("function",App.Quest.CleanBaofu.Check),
        ]).Push()
        App.Next()

    }
})(App)