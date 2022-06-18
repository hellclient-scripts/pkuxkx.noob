(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let walk = Include("include/walk.js")
    let StateWalk=function(){
        basicstate.call(this)
        this.ID="walk"
    }
    StateWalk.prototype = Object.create(basicstate.prototype)
    StateWalk.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        this.Start()
    }
    StateWalk.prototype.Start=function(){
        let move=App.GetContext("Move")
        if (!App.Data.Room.ID) {
            move.Stop()
            App.Raise("MoveLost",this)
            return
        }

        var target = move.Target
        if (typeof (target) == "string") {
            target = [target]
        }
        for(var i=0;i<target.length;i++){
            if (App.Data.Room.ID==target[i]){
                App.Next()
                return 
            }   
        }
        var path = App.API.GetPath(App.Data.Room.ID, target,App.Vehicle.Fly)
        if (path == null) {
            world.Note("无法找到从[" + App.Data.Room.ID + "]到[" + target.join(",") + "]的路径")
            App.Fail()
            return
        }
        move.Context = new walk(path.Path)
        App.Send("set breif 2")
        this.Walking()
    }
    StateWalk.prototype.Walking=function(){
        App.ChangeState("walking")
    }
    return StateWalk
})(App)