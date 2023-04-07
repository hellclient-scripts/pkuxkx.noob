(function(App){
    let Command = Include("include/command.js")
    let NamedItem=function(data){
        Command.call(this,data)
        this.ContextKey="Item"
        this.Transitions=["core.state.command.nameditem"]
    }
    NamedItem.prototype = Object.create(Command.prototype)
    NamedItem.prototype.CommandID="nameditem"
    App.RegisterState(new (Include("core/state/command/nameditem.js"))())
    return NamedItem
}(App))