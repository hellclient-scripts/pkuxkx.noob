(function(App){
    let Command = Include("include/command.js")
    let Eat=function(data){
        Command.call(this,data)
        this.ContextKey="Event"
        this.Transitions=["core.state.command.planevent"]
    }
    Eat.prototype = Object.create(Command.prototype)
    Eat.prototype.CommandID="planevent"
    App.RegisterState(new (Include("core/state/command/planevent.js"))())
    return Eat
}(App))