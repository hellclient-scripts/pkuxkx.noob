(function (app) {
    app.Path = Include("include/path.js")
    let Move=Include("include/move.js")
    app.Move=function(path,data){
        if (!path){
            path=""
        }
        let m=app.NewMove("patrol",new app.Path(path.split(";")),data)
        m.Start()
    }
    app.NewMove = function (mode, target,data) {
        return new Move(mode,target,data)
    }
    app.GetMoved=function(){
        gc()
        return moved.length
    }
    var moved=[]
    var gc=function(){
        newmoved=[]
        var now=(new Date()).getTime()
        moved.forEach(function(ts){
            if ((now-ts)<500){
                newmoved.push(ts)
            }
        })
        moved=newmoved
    }
    app.RegisterCallback("core.move.gc", function () {
        gc()
    })    
    app.Bind("gc","core.move.gc")
    app.RegisterCallback("core.move.onroomobjend", function () {
        moved.push((new Date()).getTime())
        app.OnStateEvent("move.onRoomObjEnd")
    })
    app.Bind("OnRoomEnd", "core.move.onroomobjend")
    app.OnMoveStepTimeout = function (name) {
        app.OnStateEvent("move.stepTimeout")
    }
    app.Core.OnMoveWrongWay=function(name, output, wildcards){
        app.Data.Room.ID=""
        app.OnStateEvent("move.wrongway")
    }
    app.Core.OnMoveRetry=function(name, output, wildcards){
        moved.splice(-1)
        app.OnStateEvent("move.retry")
    }
    app.Core.OnMoveIgnore=function(name, output, wildcards){
        moved.splice(-1)
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
    app.RegisterState(new (Include("core/state/move/patrol.js"))())
    app.RegisterState(new (Include("core/state/move/patroling.js"))())
    app.RegisterState(new (Include("core/state/move/patrolnobusy.js"))())
    app.RegisterState(new (Include("core/state/move/find.js"))())
    app.RegisterState(new (Include("core/state/move/finding.js"))())

})(App)