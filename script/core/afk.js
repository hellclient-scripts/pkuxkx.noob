(function (App) {
    App.Data.Afk = false
    App.Data.LastHere=Now()
    App.Core.Afk = {}
    App.SetAfk = function (enabeld) {
        if (enabeld==false){
            App.Data.LastHere=Now()
        }
        if (enabeld != App.Data.Afk) {
            Note("暂离模式 " + (enabeld ? "开启" : "关闭"))
            if (enabeld) {
                Note("通过#here,#stop,#start,#quests,#q命令或执行队列会离开暂离模式")
            }
            App.Data.Afk = enabeld
            App.Core.HUD.UpdateStatus()
        }
        App.Raise(enabeld?"afk":"here")
    }
    App.Core.Afk.OnAliasAfk = function () {
        App.SetAfk(true)
    }
    App.Core.Afk.OnAliasHere = function () {
        App.SetAfk(false)
    }
    App.RegisterCallback("core.afk.here",function(){
        App.SetAfk(false)
    })
    App.Bind("start","core.afk.here")
    App.Bind("stop","core.afk.here")
})(App)