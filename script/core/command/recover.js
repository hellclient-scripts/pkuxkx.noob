(function(App){
    let Command = Include("include/command.js")
    let Eat=function(data){
        Command.call(this,data)
        this.Transitions=["core.state.command.recover"]
    }
    Eat.prototype = Object.create(Command.prototype)
    Eat.prototype.CommandID="recover"
    App.RegisterState(new (Include("core/state/command/recover.js"))())
    return Eat
}(App))