(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let patrol = Include("include/patrol.js")
    let StatePatrol=function(){
        basicstate.call(this)
        this.ID="patrol"
    }
    StatePatrol.prototype = Object.create(basicstate.prototype)
    StatePatrol.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        this.Start()
    }
    StatePatrol.prototype.Start=function(){
        let move=App.GetContext("Move")
        move.Context=new patrol(move.Target)
        move.StartCmd="l"
        this.Patroling()
    }
    StatePatrol.prototype.Patroling=function(){
        App.ChangeState("patroling")
    }
    return StatePatrol
})(App)