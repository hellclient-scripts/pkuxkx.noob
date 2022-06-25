(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.command.walk"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        if (!App.Data.Room.ID) {
            App.Raise("MoveLost",this)
            return
        }
        let move=App.GetContext("Move")
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
        App.Send("set breif 2")
        App.NewCommand("move",App.Options.NewPath(path.Path,move.Vehicle)).Push()
        App.Next()
    }
    return State
})(App)
