(function(App){
    let Command = Include("include/command.js")
    let Asset=function(data){
        Command.call(this,data)
        this.ContextKey="Strategy"
        this.Transitions=["core.state.command.asset"]
    }
    Asset.prototype = Object.create(Command.prototype)
    Asset.prototype.CommandID="asset"
    App.RegisterState(new (Include("core/state/command/asset.js"))())
    return Asset
}(App))