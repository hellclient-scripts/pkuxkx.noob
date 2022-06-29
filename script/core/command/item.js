(function(App){
    let Command = Include("include/command.js")
    let Item=function(data){
        Command.call(this,data)
        this.ContextKey="Item"
        this.Transitions=["core.state.command.item"]
    }
    Item.prototype = Object.create(Command.prototype)
    Item.prototype.CommandID="item"
    App.RegisterState(new (Include("core/state/command/item.js"))())
    return Item
}(App))