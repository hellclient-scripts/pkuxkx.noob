
(function(App){
    let Command = Include("include/command.js")
    let Prepare=function(data){
        Command.call(this,data)
        this.ContextKey="Prepare"
        this.Transitions=["core.state.prepare.check","core.state.prepare.confirm"]
    }
    Prepare.prototype = Object.create(Command.prototype)
    Prepare.prototype.CommandID="prepare"
    return Prepare
}(App))