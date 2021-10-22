(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateArrive=function(){
        basicstate.call(this)
        this.ID="arrive"
    }
    StateArrive.prototype = Object.create(basicstate.prototype)
    StateArrive.prototype.Enter=function(Context,newstatue){
    }
    StateArrive.prototype.OnEvent=function(context,event,data){
    }
    return StateArrive
})(App)