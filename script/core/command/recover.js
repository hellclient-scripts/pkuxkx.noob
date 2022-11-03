(function(App){
    let Command = Include("include/command.js")
    let Recover=function(data){
        Command.call(this,data)
        this.Transitions=["core.state.command.recover"]
    }
    Recover.prototype = Object.create(Command.prototype)
    Recover.prototype.CommandID="recover"
    App.RegisterState(new (Include("core/state/command/recover.js"))())
    return Recover
}(App))