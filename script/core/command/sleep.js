(function(App){
    let Command = Include("include/command.js")
    let Sleep=function(data){
        Command.call(this,data)
        this.ContextKey="Sleep"
        this.Transitions=["core.state.sleep.sleep"]
    }
    Sleep.prototype = Object.create(Command.prototype)
    Sleep.prototype.CommandID="sleep"
    return Sleep
}(App))