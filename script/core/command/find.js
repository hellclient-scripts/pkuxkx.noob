(function(App){
    let Command = Include("include/command.js")
    let Find=function(data){
        Command.call(this,data)
        this.ContextKey="Move"
        this.Transitions=["core.state.command.move"]
    }
    Find.prototype = Object.create(Command.prototype)
    Find.prototype.ApplyData=function(automaton){
        let move=App.NewMove("find",this.Data.Path,this.Data.Goal)
        App.Core.Traversal.LastMove=move
        automaton.WithData(this.ContextKey,move)
    }
    Find.prototype.CommandID="find"
    return Find
}(App))