(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let StateMove=function(){
        basicstate.call(this)
        this.ID="move"
    }
    StateMove.prototype = Object.create(basicstate.prototype)
    StateMove.prototype.Enter=function(context,newstatue){
        world.EnableTriggerGroup("move",true)
        basicstate.prototype.Enter.call(this,context,newstatue)
    }
    StateMove.prototype.Leave=function(context,newstatue){
        world.EnableTimer("steptimeout",false)
        world.EnableTriggerGroup("move",false)
        basicstate.prototype.Leave.call(this,context,newstatue)
    }
    StateMove.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "rollback":
                App.LastMove=App.GetContext("Move")
            break
            case "move.wrongway":
                if (App.Vehicle&&App.Vehicle.OnWrongway){
                    App.Vehicle.OnWrongway()
                    return
                }
                if (App.Data.Room.MoveRetried>10){
                    App.Data.Room.ID=""
                    App.Core.MoveWrongWay(App.GetContext("Move"))
                }else{
                    App.Data.Room.MoveRetried++
                    App.RaiseStateEvent("move.retry")
                }
            break
            case "move.ignore":
                this.Ignore()
            break
            case "move.notallowed":
                Note("无法通过")
                App.Fail()
                break
        }
    }
    StateMove.prototype.Ignore=function(){
        let move=App.GetContext("Move")
        move.Ignore=true
    }
    StateMove.prototype.Go=function(command){
        App.Go(command)
    }
    StateMove.prototype.TryMove=function(step){
        let move=App.GetContext("Move")
        if (!step){
            step=move.Current
        }
        // App.Data.Room.ID=""
        let maze=App.Core.Maze.LoadMaze(step.Command)
        if (maze){
            maze.Explore(this)
            return
        }
        if (!step.FromRoom){
            step.FromRoom=App.Data.Room.ID
        }
        move.FromRoom=step.FromRoom
        this.Go(step.Command)
    }
    return StateMove
})(App)