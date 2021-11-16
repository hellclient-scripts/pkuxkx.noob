(function (app) {
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
        let move=app.GetContext("Move")
        if (!app.Data.Room.ID) {
            move.Stop()
            app.Raise("MoveLost",this)
            return
        }
        if (app.Data.Room.ID==move.Target){
            move.Finish()
            return 
        }
        var target = move.Target
        if (typeof (target) == "string") {
            target = [target]
        }
        var path = app.API.GetPath(app.Data.Room.ID, target,app.Vehicle.Fly)
        if (path == null) {
            world.Note("无法找到从[" + app.Data.Room.ID + "]到[" + target.join(",") + "]的路径")
            app.Fail()
            return
        }
        move.Context = new walk(path.Path)
        this.Walking()
    }
    StateWalk.prototype.Walking=function(){
        app.ChangeState("walking")
    }
    return StateWalk
})(App)