(function (app) {
    let statemove = Include("core/state/statemove.js")
    let StateLocate=function(){
        statemove.call(this)
        this.ID="locate"
    }
    StateLocate.prototype = Object.create(statemove.prototype)
    StateLocate.prototype.Enter=function(Context,newstatue){
        statemove.prototype.Enter.call(this,Context,newstatue)
    }
    StateLocate.prototype.Leave=function(Context,oldstatue){
        statemove.prototype.Leave.call(this,Context,oldstatue)
    }
    StateLocate.prototype.OnEvent=function(context,event,data){
        statemove.prototype.OnEvent.call(this,context,event,data)
    }
    return StateLocate
})(App)