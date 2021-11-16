(function (app) {
    app.Path = Include("include/path.js")
    let Move=Include("include/move.js")
    app.NewMove = function (mode, target) {
        return new Move(mode,target)
    }
    app.RegisterCallback("core.move.onroomobjend", function () {
        app.OnStateEvent("move.onRoomObjEnd")
    })
    // app.RegisterCallback("core.move.onStepRoomObj", function (data) {
    //     if (data && !data.Found) {
    //         let obj = data["Obj"]
    //         if (!obj) {
    //             return true
    //         }
    //         if (!App.HasRoomObj(obj)) {
    //             return true
    //         }
    //         if (data["Cmd"]) {
    //             app.Send(data["Cmd"])
    //         }
    //         data.Found = true
    //         return false
    //     }
    //     return true
    // })
    app.RegisterCallback("core.move.nobusy", function () {
        if (app.Data.Move && !app.Data.Move.Paused) {
            app.Data.Move.Move()
        }
    })
    app.Bind("OnRoomEnd", "core.move.onroomobjend")
    app.OnMoveStepTimeout = function (name) {
        app.OnStateEvent("move.stepTimeout")
    }
    app.Core.OnMoveRetry=function(name, output, wildcards){
        app.OnStateEvent("move.retry")
    }
    app.Core.OnMoveIgnore=function(name, output, wildcards){
        app.OnStateEvent("move.ignore")
    }
    app.Core.OnMoveEnterBoat=function(name, output, wildcards){
        app.OnStateEvent("move.enterboat")
        if (app.Data.Move && !app.Data.Move.Paused && app.Data.Move.Current!=null) {
            if (app.Data.Move.Current.Command.indexOf("yell boat")>=0){
                app.Go("enter")
            }
        }

    }
    app.Core.OnMoveSailEnd=function(name, output, wildcards){
        app.Send("halt")
        app.Go("out ")
    }
    app.RegisterCallback("core.move.sail",function(){
        app.Raise("Waiting")
    })
    app.RegisterCommand("sail","core.move.sail")
    app.RegisterState(new (Include("core/state/move/walk.js"))())
    app.RegisterState(new (Include("core/state/move/walking.js"))())
    app.RegisterState(new (Include("core/state/move/locate.js"))())
    app.RegisterState(new (Include("core/state/move/locating.js"))())

})(App)