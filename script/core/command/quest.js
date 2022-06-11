(function(App){
    let Command = Include("include/command.js")
    let Quest=function(data){
        Command.call(this,data)
        this.ContextKey="Quest"
        this.Transitions=["quest"]
    }
    Quest.prototype = Object.create(Command.prototype)
    Quest.prototype.CommandID="quest"
    App.RegisterState(new (Include("core/state/quest.js"))())
    return Quest
}(App))