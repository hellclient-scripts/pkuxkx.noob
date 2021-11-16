(function(app){
    let Move=function(mode,target){
        this.Mode=mode
        this.Target=target
        this.Current=null
        this.Data={}
        this.Context=null
        this.StateOnStep=""
        this.Stopped=false
        this.OnRoom=""
    }
    Move.prototype.Start=function(){
        app.Automaton.Push()
        app.SetContext("Move",this)
        app.ChangeState(this.Mode)
    }
    Move.prototype.Stop=function(){
        this.Stopped=true
    }
    Move.prototype.Go=function(command){
        app.Go(command)
    }
    Move.prototype.TryMove=function(step){
        if (!step){
            step=this.Current
        }
        this.Go(step.Command)
    }
    return Move
})(App)