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
        this.FromRoom=""
    }
    Move.prototype.Start=function(final){
        App.Automaton.Push([],final)
        App.SetContext("Move",this)
        App.LastMove=this
        App.ChangeState(this.Mode)
    }
    Move.prototype.WithData=function(data){
        this.Data=data
        return this
    }
    Move.prototype.Continue=function(final){
        App.Automaton.Push([],final)
        App.SetContext("Move",this)
        App.ChangeState(this.StateOnStep)
    }
    Move.prototype.Stop=function(){
        this.Stopped=true
    }
    return Move
})(App)