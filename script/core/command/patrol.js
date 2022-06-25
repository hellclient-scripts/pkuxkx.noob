(function(App){
    let Command = Include("include/command.js")
    let Patrol=function(data){
        Command.call(this,data)
        this.ContextKey="Move"
        this.Transitions=["core.state.command.move"]
    }
    Patrol.prototype = Object.create(Command.prototype)
    Patrol.prototype.ApplyData=function(automaton){
        let move=App.NewMove("patrol",this.Data.Path).WithVehicle(this.Data.Vehicle)
        automaton.WithData(this.ContextKey,move)
    }
    Patrol.prototype.CommandID="patrol"
    App.RegisterState(new (Include("core/state/command/move.js"))())
    return Patrol
}(App))