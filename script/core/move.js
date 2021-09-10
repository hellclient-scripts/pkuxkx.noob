(function(app){
    app.Path=Include("include/path.js")
    let locate=Include("include/locate.js")
    Move=function(mode,target,onFinish,data){
        this.Target=target
        this.Mode=mode?mode:"walk"
        this.OnFinish=onFinish?onFinish:""
        this.Data=data?data:""
        this.Context=null
        this.OnStart=""
        this.OnStep=""
        this.OnFail=""
        this.OnWrongway=""
    }
    Move.prototype.OnRoomObjEnd=function(){
        var walk=this
        switch (walk.Mode){
            case "walk":
            break
            case "run":
            break
            case "locate":
                world.EnableTimer("steptimeout",false)
                if (app.Data.Room.ID){
                    world.Note("定位成功")
                    if (app.Data.PendingMove!=null){
                        app.Data.Move=app.Data.PendingMove
                        app.Data.PendingMove=null
                        app.Data.Move.Start()
                        return
                    }
                    this.Stop()
                    app.ExecuteCallback(this.onFinish,this.Data)
                    return
                }
                let step=walk.Context.Enter(app.Data.Room.Exits)
                if (step){
                    this.tryMove(step)
                }else{
                    this.Stop()
                    world.Note("定位失败")
                    app.ExecuteCallback(this.onFail,this.Data)
                }
            break
            default:
            throw "app.Move:Mode["+walk.Mode+"]无效"

        }
    }
    Move.prototype.OnStepTimeout=function(){
        world.EnableTimer("steptimeout",false)
        let step=this.Context.Skip()
        if (step){
            world.Note("移动超时，换个出口")
            this.tryMove(step)
        }else{
            this.Stop()
            world.Note("定位失败")
            app.ExecuteCallback(this.onFail,this.Data)
        }
    }
    Move.prototype.Stop=function(){
        world.EnableTimer("steptimeout",false)
        app.Data.Move=null
        app.Data.PendingMove=null
    }
    Move.prototype.Start=function(){
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
            break
            case "locate":
                walk.Context=new locate(walk.Target-0)
                App.Send("l")
            break
            default:
                throw "app.Move:Mode["+walk.Mode+"]无效"
  
        }
    }
    Move.prototype.tryMove=function(data){
        world.EnableTimer("steptimeout",true)
        App.Send(data)
    }
    app.Move=Move
    app.Data.Move=null
    app.Data.PendingMove=null

    app.RegisterCallback("core.move.onroomobjend",function(){
        if (app.Data.Move){
            app.Data.Move.OnRoomObjEnd()
        }
    })
    app.Bind("OnRoomEnd","core.move.onroomobjend")
    app.OnMoveStepTimeout=function(name){
        if (app.Data.Move){
            app.Data.Move.OnStepTimeout()
        }
    }

})(App)