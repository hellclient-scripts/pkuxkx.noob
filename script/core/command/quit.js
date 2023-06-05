(function(App){
    let Command = Include("include/command.js")
    let Do=function(data){
        Command.call(this,data)
        this.ContextKey="Bind"
        this.Transitions=["core.state.command.quit"]
    }
    Do.prototype = Object.create(Command.prototype)
    Do.prototype.CommandID="quit"
    App.RegisterState(new (Include("core/state/command/quit.js"))())
    return Do
}(App))