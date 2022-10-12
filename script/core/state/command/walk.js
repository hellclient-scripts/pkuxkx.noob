(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.command.walk"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "rollback":
                this.Enter()
            break
        }
    }

    State.prototype.Enter=function(context,oldstatue){
        let move=App.GetContext("Move")
        if (!App.Data.Room.ID) {
            App.Core.MoveUnknownStart(move)
            return
        }
        let target=move.Target
        if (typeof (target) == "string") {
            target = [target]
        }
        for(var i=0;i<target.length;i++){
            if (App.Data.Room.ID==target[i]){
                App.Next()
                return 
            }   
        }
        var path = App.API.GetPath(App.Data.Room.ID, target,App.GetVehicle(move.Vehicle).Fly)
        if (path == null) {
            world.Note("无法找到从[" + App.Data.Room.ID + "]到[" + target.join(",") + "]的路径")
            App.Fail()
            return
        }
        App.Send("set brief 2")
        App.NewCommand("move",App.Options.NewPath(path.Path,move.Vehicle)).Push()
        App.Next()
    }
    return State
})(App)
