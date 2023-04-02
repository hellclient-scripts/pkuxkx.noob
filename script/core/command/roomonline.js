(function(App){
    let Command = Include("include/command.js")
    let State=function(data){
        Command.call(this,data)
        this.ContextKey="Online"
        this.Transitions=["core.state.command.roomonline"]
    }
    State.prototype = Object.create(Command.prototype)
    State.prototype.CommandID="roomonline"
    App.RegisterState(new (Include("core/state/command/roomonline.js"))())

    return State
}(App))