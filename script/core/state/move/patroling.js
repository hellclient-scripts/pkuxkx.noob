(function (App) {
    let Move = Include("core/state/move/move.js")
    let StatePatroling=function(){
        Move.call(this)
        this.ID="patroling"
    }
    StatePatroling.prototype = Object.create(Move.prototype)
    StatePatroling.prototype.GetStateOnStep=function(){
        let move=App.GetContext("Move")
        return move.StateOnStep?move.StateOnStep:"patrolnobusy"
    }
    StatePatroling.prototype.Enter=function(context,newstatue){
        Move.prototype.Enter.call(this,context,newstatue)
        let move=App.GetContext("Move")
        if (move.StartCmd){
            App.Send(move.StartCmd)
            move.StartCmd=""
            return
        }
        this.Move()
    }
    StatePatroling.prototype.Leave=function(context,newstatue){
        Move.prototype.Leave.call(this,context,newstatue)
    }
    StatePatroling.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "move.retry":
                this.Retry()
            break
            case "move.retrymove":
                this.RetryMove()
            break
            case "move.onRoomObjEnd":
                this.OnRoomObjEnd()
            break
            default:
                Move.prototype.OnEvent.call(this,context,event,data)
        }
    }
    StatePatroling.prototype.Move=function(){
        let move=App.GetContext("Move")
        move.Current = move.Context.Move()
        if (move.Current == null) {
            this.Finish()
            return
        }
        this.TryMove()
    }
    StatePatroling.prototype.Fail=function(){
        world.Note("巡查失败")
        App.Automaton.Fail()
    }

    StatePatroling.prototype.Finish=function(){
        world.Note("巡查成功")
        App.Next()
    }
    StatePatroling.prototype.Retry=function(){
        world.DoAfterSpecial(App.Vehicle.RetryInterval, 'App.OnStateEvent("move.retrymove")', 12);
    }
    StatePatroling.prototype.RetryMove=function(){
        this.TryMove()
    }
    StatePatroling.prototype.OnRoomObjEnd=function(){
        let move=App.GetContext("Move")
        if (move.Ignore){
            move.Ignore=false
            return;
        }
        App.ChangeState(this.GetStateOnStep())
    }
    return StatePatroling
})(App)