(function(App){
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
        App.Automaton.Push([],final)
        App.SetContext("Move",this)
        App.ChangeState(this.Mode)
    }
    Move.prototype.Stop=function(){
        this.Stopped=true
    }
    return Move
})(App)