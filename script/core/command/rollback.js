(function(App){
    let Command = Include("include/command.js")
    let State=function(data){
        Command.call(this,data)
        this.ContextKey="Snap"
        this.Transitions=["core.state.command.rollback"]
    }
    State.prototype = Object.create(Command.prototype)
    State.prototype.CommandID="rollback"
    App.RegisterState(new (Include("core/state/command/rollback.js"))())

    return State
}(App))