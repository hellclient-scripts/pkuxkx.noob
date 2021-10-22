(function (app) {
    let statemove = Include("core/state/statemove.js")
    let StatePatrol=function(){
        statemove.call(this)
        this.ID="patrol"
    }
    StatePatrol.prototype = Object.create(statemove.prototype)
    StatePatrol.prototype.Enter=function(Context,newstatue){
        statemove.prototype.Enter(Context,newstatue)
    }
    StatePatrol.prototype.Leave=function(Context,oldstatue){
        statemove.prototype.Leave(Context,oldstatue)
    }
    StatePatrol.prototype.OnEvent=function(context,event,data){
    }
    return StatePatrol
})(App)