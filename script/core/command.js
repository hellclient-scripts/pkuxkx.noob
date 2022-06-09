(function(App){
    App.Commands={}
    App.RegisterCommand=function(command){
        let id=command.prototype.CommandID
        if (!id){
            throw "Command id不可为空"
        }
        App.Commands[id]=command
    }
    App.NewCommand=function(id,data){
        if (App.Commands[id]==undefined){
            throw "Command id["+id+"]不存在"
        }
        return new App.Commands[id](data)
    }
    App.Exec=function(command){
        command.Push()
        App.Next()
    }
    App.RegisterCommand(Include("core/command/ask.js"))
    App.RegisterCommand(Include("core/command/delay.js"))
    App.RegisterCommand(Include("core/command/do.js"))
    App.RegisterCommand(Include("core/command/nobusy.js"))
    App.RegisterCommand(Include("core/command/patrol.js"))
    App.RegisterCommand(Include("core/command/to.js"))

})(App)