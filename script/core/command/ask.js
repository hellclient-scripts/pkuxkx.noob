(function(App){
    let Command = Include("include/command.js")
    let Ask=function(data){
        Command.call(this,data)
        this.ContextKey="Question"
        this.Transitions=["core.state.ask"]
    }
    Ask.prototype = Object.create(Command.prototype)
    Ask.prototype.CommandID="ask"
    return Ask
}(App))