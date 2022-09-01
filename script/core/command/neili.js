(function(App){
    let Command = Include("include/command.js")
    let Neili=function(data){
        Command.call(this,data)
        this.ContextKey="Neili"
        this.Transitions=["core.state.command.neili"]
    }
    Neili.prototype = Object.create(Command.prototype)
    Neili.prototype.CommandID="neili"
    App.RegisterState(new (Include("core/state/command/neili.js"))())
    return Neili
}(App))