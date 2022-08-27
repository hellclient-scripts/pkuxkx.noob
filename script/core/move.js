(function (App) {
    let Move=Include("include/move.js")
    let Goal=Include("core/goal.js")
    App.LastMove=null
    App.NewGoal=function(target){
        return new Goal(target)
    }
    App.Locate=function(depth){
        if(!depth){
            depth=8
        }
        App.NewCommand("locate",depth).Push()
        App.Next()
    }
    App.Core.OnAliasLocate=function (name, line, wildcards){
        App.Locate()
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

    var moved=[]
    var movebuff=[]
    var gc=function(){
        newmoved=[]
        var now=(new Date()).getTime()
        moved.forEach(function(ts){
            if ((now-ts)<600){
                newmoved.push(ts)
            }
        })
        moved=newmoved
    }
    
    App.RegisterCallback("core.move.gc", function () {
        gc()
        if (moved.length<3&&movebuff.length){
            App.Send(movebuff.shift())
            moved.push((new Date()).getTime())
        }
    })

    App.Core.GetMovePerHalfSecond=function(){
        if (App.Data.HP.eff_jingli>200&&(App.Data.HP.eff_jingli>(App.Data.HP.jingli*0.8))){
            if (App.Data.HP.eff_jingli>(App.Data.HP.jingli)){
                return 99
            }
            return 8
        }
        return 3
    }
    App.SendToMoveBuff=function(cmd){
        gc()
        if (moved.length<App.Core.GetMovePerHalfSecond()){
            App.Send(cmd)
            moved.push((new Date()).getTime())
        }else{
            movebuff.push(cmd)
        }
    }
    App.Bind("gc","core.move.gc")
    App.RegisterCallback("core.move.onroomobjend", function () {
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
    App.Core.OnMoveNeedRest=function(name, output, wildcards){
        App.RaiseStateEvent("move.needrest")
    }
    App.Core.OnMoveGuard=function(name, output, wildcards){
        moved.splice(-1)
        App.RaiseStateEvent("move.retry")
    }
    App.Core.OnMoveDoor=function(){
        moved.splice(-1)
        App.RaiseStateEvent("move.door")
    }
    App.Core.OnMoveRain=function(name, output, wildcards){
        if (wildcards[0]==App.Data.Room.Name){
            App.RaiseStateEvent("move.retry")
        }
    }
    App.Core.OnBuffFull=function(name, output, wildcards){
        App.RaiseStateEvent("core.bufffull")
    }
    App.Core.OnMoveNotAllowed=function(name, output, wildcards){
        App.RaiseStateEvent("move.notallowed")
    }
    App.Core.OnNoWield=function(name, output, wildcards){
        App.RaiseStateEvent("move.nowield",wildcards[0])
    }
    App.Core.OnMoveIgnore=function(name, output, wildcards){
        moved.splice(-1)
        App.RaiseStateEvent("move.ignore")
    }
    App.Core.OnCartShang=function(name, output, wildcards){
        App.Raise("Waiting")
    }
    App.Core.OnCartXia=function(name, output, wildcards){
        App.Send("#halt;xia")
    }
    App.RegisterCallback("core.move.waiting",function(){
        App.Send(App.GetParamWaitCmd())
    })
    App.Bind("Waiting","core.move.waiting")
    App.Core.OnMoveEnterBoat=function(name, output, wildcards){
        App.RaiseStateEvent("move.enterboat")
        if (App.Data.Move && !App.Data.Move.Paused && App.Data.Move.Current!=null) {
            if (App.Data.Move.Current.Command.indexOf("yell boat")>=0){
                App.Go("enter")
            }
        }

    }
    App.Core.OnMoveAnswer=function(name, output, wildcards){
        let answer=App.Info.Answers[output]
        if (answer){
            moved.splice(-1)
            App.RaiseStateEvent("move.retry")    
            App.Send(answer)
        }else{
            App.RaiseStateEvent("move.notallowed")
        }
    }

    App.Core.OnMoveSailEnd=function(name, output, wildcards){
        App.Send("#halt")
        App.Go("out ")
    }
    App.Core.OnMoveRideEnd=function(name, output, wildcards){
        App.Send("#halt")
    }
    App.RegisterCallback("core.move.sail",function(){
        App.Raise("Waiting")
    })
    App.RegisterAlias("sail","core.move.sail")
    App.RegisterCallback("core.move.ask",function(data){
        let cmd=data.split(" about ")
        if (cmd.length<2){
            Note("#ask格式错误，应是 #ask xxxx about xxxx")
        }
        App.Core.AskQuestion(cmd[0],cmd[1])
    })
    App.RegisterCallback("core.move.look",function(){
        App.Look()
    })
    App.RegisterAlias("l","core.move.look")
    App.RegisterCallback("core.move.halt",function(){
        App.Send("halt;yun recover;yun regenerate")
    })
    App.RegisterAlias("halt","core.move.halt")

    App.RegisterAlias("ask","core.move.ask")        
    App.RegisterState(new (Include("core/state/move/walking.js"))())
    App.RegisterState(new (Include("core/state/move/patrol.js"))())
    App.RegisterState(new (Include("core/state/move/patroling.js"))())
    App.RegisterState(new (Include("core/state/move/patrolnobusy.js"))())
    App.RegisterState(new (Include("core/state/move/find.js"))())
    App.RegisterState(new (Include("core/state/move/finding.js"))())
    App.RegisterState(new (Include("core/state/move/search.js"))())
    App.RegisterState(new (Include("core/state/move/searchmoving.js"))())
    App.RegisterState(new (Include("core/state/move/searching.js"))())

})(App)