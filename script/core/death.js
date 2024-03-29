(function (App) {
    App.Core.Death = {}
    App.Core.Death.OnReborn = null
    App.Core.Death.OnConscious = function () {
        App.Send(" ")
        App.Raise("core.conscious")
        App.RaiseStateEvent("core.conscious")
    }
    App.Core.Death.OnDied = function () {
        DeleteTemporaryTimers()
        App.Raise("dead")
        let cb = App.GetRoomData("core.onreborn")
        if (cb) {
            App.Core.Death.OnReborn = cb
            Note("预计中的死亡")
            App.SetRoomData("core.onreborn", null)
        }
        App.ChangeState("died")
    }
    App.SetRoomOnReborn = function (cb) {
        if (cb != null) {
            Note("做好死亡处理准备")
        }
        App.SetRoomData("core.onreborn", cb)
    }
    App.Core.Death.Reborn = function () {
        App.Raise("reborn")
        let cb = App.Core.Death.OnReborn
        if (cb) {
            Note("有准备的死亡，继续执行。")
            App.Core.Death.OnReborn = null
            cb()
        }
        return
    }
    App.Core.Death.OnChoose = function () {
        App.RaiseStateEvent("core.deathchoose")
    }
    App.Core.Death.Disconnect = function () {
        SetPriority(1)
        App.Core.HUD.SetWarningMessage("挂了")
        Note("意外死亡。")
        App.Raise('UnexpectedDeath')
        Disconnect()
        App.Automaton.Flush()
    }


})(App)