(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let locate = Include("include/locate.js")
    let StateLocate=function(){
        basicstate.call(this)
        this.ID="locate"
    }
    StateLocate.prototype = Object.create(basicstate.prototype)
    StateLocate.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        this.Start()
    }
    StateLocate.prototype.Start=function(){
        let move=App.GetContext("Move")
        move.Context=new locate(move.Target-0)
        move.StartCmd="l"
        this.Locating()
    }
    StateLocate.prototype.Locating=function(){
        App.ChangeState("locating")
    }
    return StateLocate
})(App)