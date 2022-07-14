(function(App){
    let Command = Include("include/command.js")
    let SetLoot=function(data){
        Command.call(this,data)
        this.ContextKey="Yield"
        this.Transitions=["core.state.command.setyieldyes"]
    }
    SetLoot.prototype = Object.create(Command.prototype)
    SetLoot.prototype.CommandID="setyieldyes"
    App.RegisterState(new (Include("core/state/command/setyieldyes.js"))())
    return SetLoot
}(App))