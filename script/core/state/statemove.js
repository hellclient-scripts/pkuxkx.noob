(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateMove=function(){
        basicstate.call(this)
    }
    StateMove.prototype = Object.create(basicstate.prototype)
    StateMove.prototype.Enter=function(){

    }
    StateMove.prototype.Leave=function(){
        
    }
    StateMove.prototype.OnEvent=function(context,event,data){
    }
    return StateMove
})(App)