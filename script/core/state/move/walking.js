(function (App) {
    let Move = Include("core/state/move/move.js")
    var backward = Include("include/backward.js")
    let StateWalking=function(){
        Move.call(this)
        this.ID="walking"
    }
    StateWalking.prototype = Object.create(Move.prototype)
    StateWalking.prototype.Enter=function(context,newstatue){
        Move.prototype.Enter.call(this,context,newstatue)
        this.Move()
    }
    StateWalking.prototype.Leave=function(context,newstatue){
        Move.prototype.Leave.call(this,context,newstatue)
    }
    StateWalking.prototype.OnEvent=function(context,event,data){
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
    StateWalking.prototype.Move=function(){
        let move=App.GetContext("Move")
        if (move.Context.Path.Length() == 0) {
            App.Data.Room.ID=move.Target
            this.Finish()
            return
        }
        let step
        while (true) {
            step = move.Context.Move()
            if (step == null) {
                break
            }
            if (!backward[step.Command]) {
                break
            }
            if (move.Context.Current() && !backward[move.Context.Current().Command]) {
                break
            }
            if (!App.Vehicle.MultiStep || move.Context.Moving.length >= App.GetNumberParam("walkstep")) {
                break
            }
        }
        
        move.Context.Moving.forEach(function (step) {
            move.Current=step
            App.Go(step.Command)
        })
    }
    StateWalking.prototype.Finish=function(){
        world.Note("到达目的地")
        App.Next()
    }
    StateWalking.prototype.Retry=function(){
        world.DoAfterSpecial(App.Vehicle.RetryInterval, 'App.OnStateEvent("move.retrymove")', 12);
    }
    StateWalking.prototype.RetryMove=function(){
        let move=App.GetContext("Move")
        this.TryMove(move.Context.NextStep())
    }
    StateWalking.prototype.OnRoomObjEnd=function(){
        let move=App.GetContext("Move")
        if (move.Ignore){
            move.Ignore=false
            return;
        }
        if (move.OnRoom){
            App.ExeuteCallback(move.OnRoom,move)
        }
        move.Context.Arrive()
        if (move.Context.Moving.length == 0){
            this.Move()
        }
    }
    return StateWalking
})(App)