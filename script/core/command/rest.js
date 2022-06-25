(function(App){
    let Command = Include("include/command.js")
    let Sleep=function(data){
        Command.call(this,data)
        this.ContextKey="Rest"
        this.Transitions=["core.state.combat.rest"]
    }
    Sleep.prototype = Object.create(Command.prototype)
    Sleep.prototype.CommandID="rest"
    return Sleep
}(App))