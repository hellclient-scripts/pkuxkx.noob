(function (App) {
    let Move = Include("core/state/move/move.js")
    let State=function(){
        Move.call(this)
        this.ID="patroling"
    }
    State.prototype = Object.create(Move.prototype)
    State.prototype.GetStateOnStep=function(){
        let move=App.GetContext("Move")
        return move.StateOnStep?move.StateOnStep:"patrolnobusy"
    }
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
    State.prototype.Leave=function(context,newstatue){
        world.DeleteTemporaryTimers()
        Move.prototype.Leave.call(this,context,newstatue)
    }
    State.prototype.OnEvent=function(context,event,data){
        let move=App.GetContext("Move")
        if (!move){
            return
        }
        if (move.OnMazeStateEvent(this,event)){
            return
        }
        switch(event){
            case "combat.blockkill":
                let snap=App.Core.Snapshot.Take("move.retry")
                App.Commands([
                    App.NewCommand("function",App.Core.Combat.NewBlockedCombat),
                    App.NewCommand("rollback",snap),
                ]).Push()
                App.Next()
                return 
            case "combat.blocked":
                App.Fail()
                break
            case "core.bufffull":
            break
            case "move.door":
                App.Send("open door")
                this.Retry()
            beak
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
    State.prototype.Move=function(){
        let move=App.GetContext("Move")
        if (move.Current){
            let maze=App.Core.Maze.LoadMaze(move.Current.Command)
            if (maze ){
                if (!maze.IsEscaped(move)){
                    this.TryMove()
                    return
                 }else{
                     maze.Leave()
                 }
             }
        }
        move.Current = move.Context.Move()
        if (move.Current == null) {
            this.Finish()
            return
        }
        this.TryMove()
    }
    State.prototype.Fail=function(){
        world.Note("行走失败")
        App.Automaton.Fail()
    }

    State.prototype.Finish=function(){
        world.Note("到达目的地")
        App.Next()
    }
    State.prototype.Retry=function(){
        world.DoAfterSpecial(App.Vehicle.RetryInterval, 'App.RaiseStateEvent("move.retrymove")', 12);
    }
    State.prototype.RetryMove=function(){
        this.TryMove()
    }
    State.prototype.OnRoomObjEnd=function(){
        let move=App.GetContext("Move")
        if (move.Ignore){
            move.Ignore=false
            return;
        }
        if (move.Current&&move.Current.Target){
            if (App.Data.Room.ID==""){
                App.Data.Room.ID=move.Current.Target
            }
        }
        App.ChangeState(this.GetStateOnStep())
    }
    return State
})(App)