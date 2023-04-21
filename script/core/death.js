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
        App.ChangeState("died")
        let cb = App.GetRoomData("core.onreborn")
        if (cb) {
            App.Core.Death.OnReborn = cb
            App.SetRoomData("core.onreborn", null)
        }
    }
    App.SetRoomOnReborn = function (cb) {
        if (cb != null) {
            Note("做好死亡处理准备")
        }
        App.SetRoomData("core.onreborn", cb)
    }
    App.Core.Death.Reborn = function () {
        App.Raise("reborn")
        if (App.Core.Death.OnReborn) {
            App.Send("yun recover;yun regenerate")
            Note("有准备的死亡，继续执行。")
            let cb = App.Core.Death.OnReborn
            App.Core.Death.OnReborn = null
            cb()
            return
        }
        Note("意外死亡。")
        App.Automaton.Flush()
        // Note("退出")
        // App.Send("quit;quit")
    }
    App.Core.Death.OnChoose = function () {
        if (App.Core.Death.OnReborn) {
            Note("有准备的死亡，继续执行。")
            App.Send("enter")
        }else{
            Note("意外死亡。")
            Disconnect()
            // App.Send("quit;quit")
        }
    }
})(App)