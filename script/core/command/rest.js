(function(App){
    let Command = Include("include/command.js")
    let Rest=function(data){
        Command.call(this,data)
        this.ContextKey="Rest"
        this.Transitions=["core.state.command.rest"]
    }
    Rest.prototype = Object.create(Command.prototype)
    Rest.prototype.CommandID="rest"
    App.RegisterState(new (Include("core/state/command/rest.js"))())
    return Rest
}(App))