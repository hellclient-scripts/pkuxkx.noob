(function(App){
    //idle和delay的区别是会被#stop停止
    let Command = Include("include/command.js")
    let Delay=function(data){
        Command.call(this,data)
        this.ContextKey="Delay"
        this.Transitions=["idle"]
    }
    Delay.prototype = Object.create(Command.prototype)
    Delay.prototype.CommandID="idle"
    return Delay
}(App))