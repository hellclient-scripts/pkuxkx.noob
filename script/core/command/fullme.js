(function(App){
    let Command = Include("include/command.js")
    let Fullme=function(data){
        Command.call(this,data)
        this.ContextKey="Fullme"
        this.Transitions=["core.state.captcha.fullmestart"]
    }
    Fullme.prototype = Object.create(Command.prototype)
    Fullme.prototype.CommandID="fullme"
    return Fullme
}(App))