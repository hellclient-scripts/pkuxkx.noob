(function (app) {
    let Move = Include("core/state/move/move.js")
    var backward = Include("include/backward.js")
    let StateLocating=function(){
        Move.call(this)
        this.ID="locating"
    }
    StateLocating.prototype = Object.create(Move.prototype)
    StateLocating.prototype.Enter=function(context,newstatue){
        Move.prototype.Enter.call(context,newstatue)
    }
    StateLocating.prototype.Leave=function(context,newstatue){
        Move.prototype.Enter.call(context,newstatue)
    }
    StateLocating.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "move.retry":
                this.Retry()
            break
            case "move.retrymove":
                this.RetryExplore()
            break
            case "move.onRoomObjEnd":
                this.OnRoomObjEnd()
            break
            case "move.stepTimeout":
                this.OnStepTimeout()
            break
            default:
                Move.prototype.Enter.call(context,event,data)
        }
    }
    StateLocating.prototype.Fail=function(){
        world.Note("定位失败")
        app.Automaton.Fail()
    }
    StateLocating.prototype.OnStepTimeout=function(){
        world.EnableTimer("steptimeout",false)
        let move=app.GetContext("Move")
        let step=move.Context.Skip()
        if (step){
            world.Note("移动超时，换个出口")
            this.tryExplore(step)
        }else{
            this.Fail()
        }    
    }
    StateLocating.prototype.Finish=function(){
        world.Note("定位成功")
        app.Finish()
    }
    StateLocating.prototype.tryExplore=function(data){
        let move=app.GetContext("Move")
        world.EnableTimer("steptimeout",true)
        move.Current=data
        App.Go(data.Command)
    }
    StateLocating.prototype.Retry=function(){
        world.DoAfterSpecial(app.Vehicle.RetryInterval, 'App.OnStateEvent("move.retrymove")', 12);
    }
    StateLocating.prototype.RetryExplore=function(){
        let move=app.GetContext("Move")
        world.EnableTimer("steptimeout",false)
        this.tryExplore(move.Current)
    }
    StateLocating.prototype.OnRoomObjEnd=function(){
        let move=app.GetContext("Move")
        if (move.Ignore){
            move.Ignore=false
            return;
        }
        world.EnableTimer("steptimeout",false)
        if (app.Data.Room.Name){
            let rids=Mapper.getroomid(app.Data.Room.Name)
            if (rids&& rids.length==1){
                app.Data.Room.ID=rids[0]
            }
        }
        if (app.Data.Room.ID!==""){
            app.Finish()
            return
        }
        let step=move.Context.Enter(app.Data.Room.Exits)
        if (step){
            move.Current=step
            this.tryExplore(step)
        }else{
            this.Fail()
        }
    }
    return StateLocating
})(App)