(function (app) {
    let statemove = Include("core/state/statemove.js")
    let StateLocate=function(){
        statemove.call(this)
        this.ID="locate"
    }
    StateLocate.prototype = Object.create(statemove.prototype)
    StateLocate.prototype.Enter=function(Context,newstatue){
        statemove.prototype.Enter(Context,newstatue)
    }
    StateLocate.prototype.Leave=function(Context,oldstatue){
        statemove.prototype.Leave(Context,oldstatue)
    }
    StateLocate.prototype.OnEvent=function(context,event,data){
    }
    return StateLocate
})(App)