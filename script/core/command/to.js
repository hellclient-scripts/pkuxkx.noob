(function(App){
    let Command = Include("include/command.js")
    let To=function(data){
        Command.call(this,data)
        this.ID="move"
        this.ContextKey="Move"
        this.Transitions=["core.state.command.walk"]
    }
    To.prototype = Object.create(Command.prototype)
    // To.prototype.ApplyData=function(automaton){
    //     let move=App.NewMove("walk",this.Data.Target).WithVehicle(this.Data.Vehicle)
    //     automaton.WithData(this.ContextKey,move)
    // }
    To.prototype.CommandID="to"
    App.RegisterState(new (Include("core/state/command/walk.js"))())
    return To
}(App))