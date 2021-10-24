(function (app) {
    let statemove = Include("core/state/statemove.js")
    let StateWalk=function(){
        statemove.call(this)
        this.ID="walk"
    }
    StateWalk.prototype = Object.create(statemove.prototype)
    StateWalk.prototype.Enter=function(Context,newstatue){
        statemove.prototype.Enter.call(this,Context,newstatue)
    }
    StateWalk.prototype.Leave=function(Context,oldstatue){
        statemove.prototype.Leave.call(this,Context,oldstatue)
    }
    StateWalk.prototype.OnEvent=function(context,event,data){
        statemove.prototype.OnEvent.call(this,context,event,data)
    }
    return StateWalk
})(App)