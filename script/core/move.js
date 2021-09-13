(function (app) {
    app.Path = Include("include/path.js")
    let locate = Include("core/move/locate.js")
    let patrol = Include("core/move/patrol.js")
    let walk = Include("core/move/walk.js")
    app.NewMove = function (mode, target, onFinish, data) {
        switch (mode) {
            case "locate":
                return new locate(mode, target, onFinish, data)
                break
            case "patrol":
                return new patrol(mode, target, onFinish, data)
            case "walk":
                return new walk(mode, target, onFinish, data)

            default:
                throw "app.Move:Mode[" + walk.Mode + "]无效"
        }
    }
    app.Data.Move = null
    app.Data.PendingMove = null
    app.RegisterCallback("core.move.onroomobjend", function () {
        if (app.Data.Move && !app.Data.Move.Paused) {
            app.Data.Move.OnRoomObjEnd()
        }
    })
    app.RegisterCallback("core.move.onStepRoomObj", function (data) {
        if (data && !data.Found) {
            let obj = data["Obj"]
            if (!obj) {
                return true
            }
            if (!App.HasRoomObj(obj)) {
                return true
            }
            if (data["Cmd"]) {
                app.Send(data["Cmd"])
            }
            data.Found = true
            return false
        }
        return true
    })

    app.Bind("OnRoomEnd", "core.move.onroomobjend")
    app.OnMoveStepTimeout = function (name) {
        if (app.Data.Move && !app.Data.Move.Paused) {
            app.Data.Move.OnStepTimeout()
        }
    }
})(App)