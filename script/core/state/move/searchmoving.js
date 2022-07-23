(function (App) {
    let Move = Include("core/state/move/move.js")
    var step = Include("include/step.js")
    let State=function(){
        Move.call(this)
        this.ID="searchmoving"
    }
    State.prototype = Object.create(Move.prototype)
    State.prototype.Enter=function(context,newstatue){
        Move.prototype.Enter.call(this,context,newstatue)
        let move=App.GetContext("Move")
        if (move.StartCmd){
            App.Send(move.StartCmd)
            move.StartCmd=""
            return
        }
        this.Move()
    }
    State.prototype.GetStateOnStep=function(){
        let move=App.GetContext("Move")
        return move.StateOnStep?move.StateOnStep:"patrolnobusy"
    }
    State.prototype.Leave=function(context,newstatue){
        world.EnableTimer("steptimeout",false)
        Move.prototype.Leave.call(this,context,newstatue)
    }
    State.prototype.OnEvent=function(context,event,data){
        let move=App.GetContext("Move")
        if (move.OnMazeStateEvent(this,event)){
            return
        }
        switch(event){
            case "core.bufffull":
                break
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
    State.prototype.Fail=function(){
        world.Note("搜索失败")
        App.Automaton.Fail()
    }
    State.prototype.OnStepTimeout=function(){
        world.EnableTimer("steptimeout",false)
        world.Note("移动超时，换个出口")
        let move=App.GetContext("Move")
        let level=move.Context.Skip()
        if (!level){
            App.Fail()
        }
        let next=level.Next()
        if (next){
            move.Context=next
            move.Current=new step(next.Command)
            this.tryExplore(move.Current)
        }else{
            this.Fail()
        }    
    }
    State.prototype.tryExplore=function(data){
        let move=App.GetContext("Move")
        world.EnableTimer("steptimeout",true)
        world.ResetTimer("steptimeout")
        move.Current=data
        App.Go(data.Command)
    }
    State.prototype.Retry=function(){
        world.DoAfterSpecial(App.Vehicle.RetryInterval, 'App.RaiseStateEvent("move.retrymove")', 12);
    }
    State.prototype.RetryExplore=function(){
        let move=App.GetContext("Move")
        world.EnableTimer("steptimeout",false)
        this.tryExplore(move.Current)
    }
    State.prototype.Move=function(){
        let move=App.GetContext("Move")
        let exits=move.Data.GetExits()
        let level=move.Context.Arrive(exits)
        let next=level.Next()
        if (next){
            move.Context=next
            move.Current=new step(next.Command)
            this.tryExplore(move.Current)
        }else{
            this.Fail()
        }
    }
    State.prototype.OnRoomObjEnd=function(){
        let move=App.GetContext("Move")
        if (move.Ignore){
            move.Ignore=false
            return;
        }
        world.EnableTimer("steptimeout",false)
        App.ChangeState(this.GetStateOnStep())
    }
    return State
})(App)