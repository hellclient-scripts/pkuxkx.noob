(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let locate = Include("include/locate.js")
    let StateLocate=function(){
        basicstate.call(this)
        this.ID="locate"
    }
    StateLocate.prototype = Object.create(basicstate.prototype)
    StateLocate.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(context,oldstatue)
        this.Start()
    }
    StateLocate.prototype.Start=function(){
        let move=app.GetContext("Move")
        move.Context=new locate(move.Target-0)
        this.Locating()
        app.Send("l")
    }
    StateLocate.prototype.Locating=function(){
        app.ChangeState("locating")
    }
    return StateLocate
})(App)