(function (App) {
    let Move=Include("include/move.js")
    let Goal=Include("core/goal.js")
    App.LastMove=null
    App.NewGoal=function(target){
        return new Goal(target)
    }
    App.Move=function(path,data){
        if (!path){
            path=""
        }
        let m=App.NewMove("patrol",App.API.ConvertPath(path),data)
        m.Start()
    }
    App.NewMove = function (mode, target,data) {
        return new Move(mode,target,data)
    }
    App.GetMoved=function(){
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
    App.RegisterCallback("core.move.gc", function () {
        gc()
    })    
    App.Bind("gc","core.move.gc")
    App.RegisterCallback("core.move.onroomobjend", function () {
        moved.push((new Date()).getTime())
        App.RaiseStateEvent("move.onRoomObjEnd")
    })
    App.Bind("OnRoomEnd", "core.move.onroomobjend")
    App.OnMoveStepTimeout = function (name) {
        App.RaiseStateEvent("move.stepTimeout")
    }
    App.Core.OnMoveWrongWay=function(name, output, wildcards){
        App.Data.Room.ID=""
        App.RaiseStateEvent("move.wrongway")
    }
    App.Core.OnMoveRetry=function(name, output, wildcards){
        moved.splice(-1)
        App.RaiseStateEvent("move.retry")
    }
    App.Core.OnMoveNotAllowed=function(name, output, wildcards){
        App.RaiseStateEvent("move.notallowed")
    }
    App.Core.OnMoveIgnore=function(name, output, wildcards){
        moved.splice(-1)
        App.RaiseStateEvent("move.ignore")
    }
    App.Core.OnMoveEnterBoat=function(name, output, wildcards){
        App.RaiseStateEvent("move.enterboat")
        if (App.Data.Move && !App.Data.Move.Paused && App.Data.Move.Current!=null) {
            if (App.Data.Move.Current.Command.indexOf("yell boat")>=0){
                App.Go("enter")
            }
        }

    }
    App.Core.OnMoveSailEnd=function(name, output, wildcards){
        App.Send("halt")
        App.Go("out ")
    }
    App.RegisterCallback("core.move.sail",function(){
        App.Raise("Waiting")
    })
    App.RegisterCallback("core.move.home",function(){
        App.Send("enter "+App.GetParamHome())
    })
    App.RegisterAlias("sail","core.move.sail")
    App.RegisterAlias("home","core.move.home")
    App.RegisterState(new (Include("core/state/move/walk.js"))())
    App.RegisterState(new (Include("core/state/move/walking.js"))())
    App.RegisterState(new (Include("core/state/move/locate.js"))())
    App.RegisterState(new (Include("core/state/move/locating.js"))())
    App.RegisterState(new (Include("core/state/move/patrol.js"))())
    App.RegisterState(new (Include("core/state/move/patroling.js"))())
    App.RegisterState(new (Include("core/state/move/patrolnobusy.js"))())
    App.RegisterState(new (Include("core/state/move/find.js"))())
    App.RegisterState(new (Include("core/state/move/finding.js"))())

})(App)