(function(App){
    let Command = Include("include/command.js")
    let NoBusy=function(data){
        Command.call(this,data)
        this.ID="nobusy"
        this.States=["core.state.command.do"]
    }
    NoBusy.prototype = Object.create(Command.prototype)
    NoBusy.prototype.CommandID="nobusy"

    return NoBusy
}(App))