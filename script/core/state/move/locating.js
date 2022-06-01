(function (app) {
    let Move = Include("core/state/move/move.js")
    var backward = Include("include/backward.js")
    let StateLocating=function(){
        Move.call(this)
        this.ID="locating"
    }
    StateLocating.prototype = Object.create(Move.prototype)
    StateLocating.prototype.Enter=function(context,newstatue){
        Move.prototype.Enter.call(this,context,newstatue)
        let move=App.GetContext("Move")
        if (move.StartCmd){
            App.Send(move.StartCmd)
            move.StartCmd=""
            return
        }
    }
    StateLocating.prototype.Leave=function(context,newstatue){
        Move.prototype.Leave.call(this,context,newstatue)
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
                Move.prototype.OnEvent.call(this,context,event,data)
        }
    }
    StateLocating.prototype.Fail=function(){
        world.Note("定位失败")
        App.Automaton.Fail()
    }
    StateLocating.prototype.OnStepTimeout=function(){
        world.EnableTimer("steptimeout",false)
        let move=App.GetContext("Move")
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
        App.Finish()
    }
    StateLocating.prototype.tryExplore=function(data){
        let move=App.GetContext("Move")
        world.EnableTimer("steptimeout",true)
        move.Current=data
        App.Go(data.Command)
    }
    StateLocating.prototype.Retry=function(){
        world.DoAfterSpecial(App.Vehicle.RetryInterval, 'App.OnStateEvent("move.retrymove")', 12);
    }
    StateLocating.prototype.RetryExplore=function(){
        let move=App.GetContext("Move")
        world.EnableTimer("steptimeout",false)
        this.tryExplore(move.Current)
    }
    StateLocating.prototype.OnRoomObjEnd=function(){
        let move=App.GetContext("Move")
        if (move.Ignore){
            move.Ignore=false
            return;
        }
        world.EnableTimer("steptimeout",false)
        if (App.Data.Room.Name){
            let rids=Mapper.getroomid(App.Data.Room.Name)
            if (rids&& rids.length==1){
                App.Data.Room.ID=rids[0]
            }
        }
        if (App.Data.Room.ID!==""){
            App.Finish()
            return
        }
        let step=move.Context.Enter(App.Data.Room.Exits)
        if (step){
            move.Current=step
            this.tryExplore(step)
        }else{
            this.Fail()
        }
    }
    return StateLocating
})(App)