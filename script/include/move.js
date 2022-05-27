(function(app){
    let Move=function(mode,target,data){
        this.Mode=mode
        this.Target=target
        this.Current=null
        this.Data=data?data:{}
        this.Context=null
        this.StateOnStep=""
        this.Stopped=false
        this.OnRoom=""
        this.StartCmd=""
    }
    Move.prototype.Start=function(final){
        app.Automaton.Push([],final)
        app.SetContext("Move",this)
        app.ChangeState(this.Mode)
    }
    Move.prototype.Stop=function(){
        this.Stopped=true
    }
    return Move
})(App)