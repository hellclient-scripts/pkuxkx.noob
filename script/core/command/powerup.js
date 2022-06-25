
(function(App){
    let Command = Include("include/command.js")
    let Powerup=function(data){
        Command.call(this,data)
        this.ContextKey="Command"
        this.Transitions=["core.state.command.do"]
        this.Data=world.GetVariable("powerup_cmd")
    }
    Powerup.prototype = Object.create(Command.prototype)
    Powerup.prototype.CommandID="powerup"
    return Powerup
}(App))