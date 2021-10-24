(function (app) {
    let statemove = Include("core/state/statemove.js")
    let StatePatrol=function(){
        statemove.call(this)
        this.ID="patrol"
    }
    StatePatrol.prototype = Object.create(statemove.prototype)
    StatePatrol.prototype.Enter=function(context,newstatue){
        statemove.prototype.Enter.call(this,context,newstatue)
    }
    StatePatrol.prototype.Leave=function(context,oldstatue){
        statemove.prototype.Leave.call(this,context,oldstatue)
    }
    StatePatrol.prototype.OnEvent=function(context,event,data){
        statemove.prototype.OnEvent.call(this,context,event,data)
    }
    return StatePatrol
})(App)