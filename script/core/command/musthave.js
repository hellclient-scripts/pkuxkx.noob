(function(App){
    let Command = Include("include/command.js")
    let MustHave=function(data){
        Command.call(this,data)
        this.ContextKey="Items"
        this.Transitions=["core.state.command.musthave"]
    }
    MustHave.prototype = Object.create(Command.prototype)
    MustHave.prototype.CommandID="musthave"
    App.RegisterState(new (Include("core/state/command/musthave.js"))())

    return MustHave
}(App))