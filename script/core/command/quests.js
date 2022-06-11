(function(App){
    let Command = Include("include/command.js")
    let Quests=function(data){
        Command.call(this,data)
        this.ContextKey="Quests"
        App.Core.Quest.SetQuests(data)
        this.Transitions=["core.state.quests.quests"]
    }
    Quests.prototype = Object.create(Command.prototype)
    Quests.prototype.CommandID="quests"
    return Quests
}(App))