(function(App){
    let Command = Include("include/command.js")
    let Locate=function(data){
        Command.call(this,data)
        this.ContextKey="Move"
        this.Transitions=["locate"]
    }
    Locate.prototype = Object.create(Command.prototype)
    Locate.prototype.CommandID="locate"
    Locate.prototype.ApplyData=function(automaton){
        let move=App.NewMove("locate",this.Data)
        automaton.WithData(this.ContextKey,move)
    }
    return Locate
}(App))