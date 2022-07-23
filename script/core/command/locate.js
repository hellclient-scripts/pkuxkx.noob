(function(App){
    let Command = Include("include/command.js")
    let Locate=function(data){
        Command.call(this,data)
        this.ContextKey="Depth"
        this.Transitions=["core.state.command.locate"]
    }
    Locate.prototype = Object.create(Command.prototype)
    Locate.prototype.CommandID="locate"
    App.RegisterState(new (Include("core/state/command/locate.js"))())

    return Locate
}(App))