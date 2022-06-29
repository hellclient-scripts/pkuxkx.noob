(function (App) {
    let Move = Include("core/state/move/move.js")
    var step = Include("include/step.js")
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
        world.EnableTimer("steptimeout",false)
        Move.prototype.Leave.call(this,context,newstatue)
    }
    StateLocating.prototype.OnEvent=function(context,event,data){
        let move=App.GetContext("Move")
        if (move.OnMazeStateEvent(this,event)){
            return
        }
        switch(event){
            case "core.bufffull":
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
    StateLocating.prototype.Finish=function(){
        world.Note("定位成功")
        App.Next()
    }
    StateLocating.prototype.tryExplore=function(data){
        let move=App.GetContext("Move")
        world.EnableTimer("steptimeout",true)
        world.ResetTimer("steptimeout")
        move.Current=data
        App.Go(data.Command)
    }
    StateLocating.prototype.Retry=function(){
        world.DoAfterSpecial(App.Vehicle.RetryInterval, 'App.RaiseStateEvent("move.retrymove")', 12);
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
        if (App.Data.Room.ID!==""){
            App.Next()
            return
        }
        let exits=App.Data.Room.Exits
        if (App.Info.LocateExits[App.Data.Room.Name]){
            exits=App.Info.LocateExits[App.Data.Room.Name]
        }
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
    return StateLocating
})(App)