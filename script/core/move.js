(function(app){
    newMove=function(){
        var m={
            Mode:"",
            Path:[],
            Searched:[],
            Target:"",
            OnStart:"",
            OnStep:"",
            OnPath:"",
            OnFinish:"",
            OnFail:"",
            OnWrongway:"",
            Data:"",
        }
        m.Start=start.bind(m)
        return m
    }
    app.Data.Move=null
    app.Data.PendingMove=null
    app.RegisterCallback("core.move.onmovestart",function(){
        world.EnableTriggerGroup("move",true)
        app.MoveContinue()
    })
    var start=function(){
        var walk=this
        if (app.Data.Move==null){
            app.Data.Move=walk
        }else{
            app.Data.PendingMove=walk
        }
        switch (walk.Mode){
            case "walk":
            case "run":
                if (!app.Data.Room.ID){
                    app.Raise("MoveLost")
                    return
                }
                var target=walk.Target
                if (typeof(target)=="string"){
                    target=[target]
                }
                var path=App.API.GetPath(app.Data.Room.ID,Target)
                if (path==null){
                    world.Note("无法找到从["+app.Data.Room.ID+"]到["+target.join(",")+"]的路径")
                    app.Raise("MoveNopath")
                    return
                }
                var onStart=walk.onStart
                if (!onStart){onStart="core.move.onmovestart"}
                app.Execute(onStart)
            break
            case "locate":
            break
            default:
                throw "app.Move:Mode["+walk.Mode+"]无效"
  
        }
    }
    app.NewMove=function(mode,target,onFinish,data){
        var move=newMove()
        move.Target=target
        move.Mode=mode?mode:"walk"
        move.OnFinish=onFinish?onFinish:""
        move.Data=data?data:""
        return move
    }
    app.MoveStop=function(){
        world.EnableTriggerGroup("move",false)
    }
    app.MoveContinue=function(){

    }
})(App)