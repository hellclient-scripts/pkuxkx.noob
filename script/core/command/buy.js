(function(App){
    let Command = Include("include/command.js")
    let Buy=function(data){
        Command.call(this,data)
        this.ContextKey="Item"
        this.Transitions=["core.state.command.buy"]
    }
    Buy.prototype = Object.create(Command.prototype)
    Buy.prototype.CommandID="buy"
    App.RegisterState(new (Include("core/state/command/buy.js"))())
    return Buy
}(App))