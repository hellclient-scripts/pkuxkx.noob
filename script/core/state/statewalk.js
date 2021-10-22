(function (app) {
    let statemove = Include("core/state/statemove.js")
    let StateWalk=function(){
        statemove.call(this)
        this.ID="walk"
    }
    StateWalk.prototype = Object.create(statemove.prototype)
    StateWalk.prototype.Enter=function(Context,newstatue){
        statemove.prototype.Enter(Context,newstatue)
    }
    StateWalk.prototype.Leave=function(Context,oldstatue){
        statemove.prototype.Leave(Context,oldstatue)
    }
    StateWalk.prototype.OnEvent=function(context,event,data){
    }
    return StateWalk
})(App)