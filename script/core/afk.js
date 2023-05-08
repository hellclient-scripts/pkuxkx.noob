(function (App) {
    App.Data.Afk = false
    App.Data.LastHere = Now()
    App.Core.Afk = {}
    App.Core.Afk.TurboBefore = 0
    App.SetAfk = function (enabeld) {
        if (enabeld == false) {
            App.Data.LastHere = Now()
        }
        if (enabeld != App.Data.Afk) {
            Note("暂离模式 " + (enabeld ? "开启" : "关闭"))
            if (enabeld) {
                Note("通过#here,#stop,#start,#quests,#q命令或执行队列会离开暂离模式")
            }
            App.Data.Afk = enabeld
            App.Core.HUD.UpdateStatus()
        }
        App.Raise(enabeld ? "afk" : "here")
    }
    App.Core.Afk.OnAliasAfk = function () {
        App.SetAfk(true)
    }
    App.Core.Afk.OnAliasHere = function () {
        App.SetAfk(false)
        App.Core.Afk.TurboBefore = 0
    }
    App.Core.Afk.SetTurboBefore = function (seconds) {
        Note("进入 " + seconds + " 秒超频模式。")
        App.Core.Afk.TurboBefore = Now() + (seconds * 1000)
        App.Data.Afk = false
        App.Raise("here")
        App.Raise("turbo")
        App.Core.HUD.UpdateStatus()
    }
    App.Core.Afk.IsTurbo = function () {
        return Now()<App.Core.Afk.TurboBefore
    }
    App.Core.Afk.OnAliasTurbo = function (name, line, wildcards) {
        let param=wildcards[0]-0
        if (isNaN(param)||param<=0){
            Note("格式错误。正确的格式为 #turbo 分钟数，如 #turbo 60")
            return
        }
        App.Core.Afk.SetTurboBefore(param*60)
    }

    App.RegisterCallback("core.afk.here", function () {
        App.SetAfk(false)
    })
    App.Bind("start", "core.afk.here")
    App.Bind("stop", "core.afk.here")
})(App)