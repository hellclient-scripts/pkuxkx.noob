(function(App){
    let Command = Include("include/command.js")
    let CombatInit=function(data){
        Command.call(this,data)
        this.ContextKey="Function"
        this.Transitions=["core.state.command.function"]
        this.Data=function(){
            App.Core.Combat.Init()
            App.Next()
        }
    }
    CombatInit.prototype = Object.create(Command.prototype)
    CombatInit.prototype.CommandID="combatinit"
    return CombatInit
}(App))