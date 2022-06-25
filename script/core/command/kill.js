(function(App){
    let Command = Include("include/command.js")
    let Kill=function(data){
        Command.call(this,data)
        this.ContextKey="Kill"
        this.Transitions=["core.state.combat.kill"]
    }
    Kill.prototype = Object.create(Command.prototype)
    Kill.prototype.CommandID="kill"
    return Kill
}(App))