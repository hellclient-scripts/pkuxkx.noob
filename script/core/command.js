(function(App){
    App.Commands={}
    App.Command={}
    App.RegisterCommand=function(command){
        let id=command.prototype.CommandID
        if (!id){
            throw "Command id不可为空"
        }
        App.Commands[id]=command
    }
    App.NewCommand=function(id,data,final,fail){
        if (App.Commands[id]==undefined){
            throw "Command id["+id+"]不存在"
        }
        return new App.Commands[id](data).WithFinalState(final).WithFailState(fail)
    }
    App.Commands=function(cmds,final,fail){
        return App.NewCommand("commands",cmds,final,fail)
    }

    App.Exec=function(command){
        command.Push()
        App.Next()
    }
    App.RegisterCommand(Include("core/command/ask.js"))
    App.RegisterCommand(Include("core/command/delay.js"))
    App.RegisterCommand(Include("core/command/do.js"))
    App.RegisterCommand(Include("core/command/nobusy.js"))
    App.RegisterCommand(Include("core/command/move.js"))
    App.RegisterCommand(Include("core/command/find.js"))
    App.RegisterCommand(Include("core/command/to.js"))
    App.RegisterCommand(Include("core/command/state.js"))
    App.RegisterCommand(Include("core/command/commands.js"))
    App.RegisterCommand(Include("core/command/function.js"))
    App.RegisterCommand(Include("core/command/prepare.js"))
    App.RegisterCommand(Include("core/command/quest.js"))
    App.RegisterCommand(Include("core/command/quests.js"))
    App.RegisterCommand(Include("core/command/fullme.js"))
    App.RegisterCommand(Include("core/command/sleep.js"))
    App.RegisterCommand(Include("core/command/standby.js"))
    App.RegisterCommand(Include("core/command/musthave.js"))
    App.RegisterCommand(Include("core/command/rollback.js"))
    App.RegisterCommand(Include("core/command/rest.js"))
    App.RegisterCommand(Include("core/command/setloot.js"))
    App.RegisterCommand(Include("core/command/setyieldyes.js"))
    App.RegisterCommand(Include("core/command/kill.js"))
    App.RegisterCommand(Include("core/command/powerup.js"))
    App.RegisterCommand(Include("core/command/combatinit.js"))
    App.RegisterCommand(Include("core/command/item.js"))
    App.RegisterCommand(Include("core/command/buy.js"))
    App.RegisterCommand(Include("core/command/locate.js"))
    App.RegisterCommand(Include("core/command/search.js"))

})(App)