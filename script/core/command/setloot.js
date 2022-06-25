(function(App){
    let Command = Include("include/command.js")
    let SetLoot=function(data){
        Command.call(this,data)
        this.ContextKey="Loot"
        this.Transitions=["core.state.command.setloot"]
    }
    SetLoot.prototype = Object.create(Command.prototype)
    SetLoot.prototype.CommandID="setloot"
    App.RegisterState(new (Include("core/state/command/setloot.js"))())
    return SetLoot
}(App))