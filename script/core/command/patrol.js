(function(App){
    let Command = Include("include/command.js")
    let Patrol=function(data){
        Command.call(this,data)
        this.ContextKey="Move"
        this.Transitions=["core.state.command.move"]
    }
    Patrol.prototype = Object.create(Command.prototype)
    Patrol.prototype.ApplyData=function(automaton){
        let move=App.NewMove("patrol",App.API.ConvertPath(this.Data))
        automaton.WithData(this.ContextKey,move)
    }
    Patrol.prototype.CommandID="patrol"
    return Patrol
}(App))