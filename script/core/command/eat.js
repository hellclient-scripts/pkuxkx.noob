(function(App){
    let Command = Include("include/command.js")
    let Eat=function(data){
        Command.call(this,data)
        this.Transitions=["core.state.command.eat"]
    }
    Eat.prototype = Object.create(Command.prototype)
    Eat.prototype.CommandID="eat"
    App.RegisterState(new (Include("core/state/command/eat.js"))())
    return Eat
}(App))