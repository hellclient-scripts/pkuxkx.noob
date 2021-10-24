(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateMove=function(){
        basicstate.call(this)
    }
    StateMove.prototype = Object.create(basicstate.prototype)
    StateMove.prototype.Enter=function(context,newstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        world.EnableTriggerGroup("move",true)
    }
    StateMove.prototype.Leave=function(context,oldstatue){
        basicstate.prototype.Leave.call(this,context,oldstatue)
        world.EnableTimer("steptimeout",false)
        world.EnableTriggerGroup("move",false)
    }
    return StateMove
})(App)