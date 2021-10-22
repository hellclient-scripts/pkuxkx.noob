(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateReady=function(){
        basicstate.call(this)
        this.ID="ready"
    }
    StateReady.prototype = Object.create(basicstate.prototype)
    StateReady.prototype.OnEvent=function(context,event,data){
    }
    return StateReady
})(App)