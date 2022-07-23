(function(App){
    let Command = Include("include/command.js")
    let Search=function(data){
        Command.call(this,data)
        this.ContextKey="Move"
        this.Transitions=["search"]
    }
    Search.prototype = Object.create(Command.prototype)
    Search.prototype.ApplyData=function(automaton){
        let move=App.NewMove("search",this.Data.Depth,this.Data.Goal)
        App.Core.Search.LastMove=move
        automaton.WithData(this.ContextKey,move)
    }
    Search.prototype.CommandID="search"
    return Search
}(App))