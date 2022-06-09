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
        this.Vehicle=""
    }
    Move.prototype.Push=function(final){
        App.Automaton.Push(["core.state.move.start"],final)
        App.SetContext("Move",this)
    }
    Move.prototype.Start=function(final){
        this.Push(final)
        App.Next()
    }
    Move.prototype.WithData=function(data){
        this.Data=data
        return this
    }
    Move.prototype.WithVehicle=function(vehicle){
        this.Vehicle=vehicle
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
    App.RegisterState(new (Include("core/state/move/start.js"))())
    return Move
})(App)