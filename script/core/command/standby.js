(function(App){
    let Command = Include("include/command.js")
    let Rest=function(data){
        Command.call(this,data)
        this.ContextKey="Rest"
        this.Transitions=["core.state.command.standby"]
    }
    Rest.prototype = Object.create(Command.prototype)
    Rest.prototype.CommandID="standby"
    App.RegisterState(new (Include("core/state/command/standby.js"))())
    return Rest
}(App))