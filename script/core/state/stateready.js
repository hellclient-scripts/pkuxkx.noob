(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateReady=function(){
        basicstate.call(this)
        this.ID="ready"
        this.Handler=null
    }
    StateReady.prototype = Object.create(basicstate.prototype)
    StateReady.prototype.Enter=function(context,newstatue){
        basicstate.prototype.Enter.call(context,newstatue)
        this.Handler()
    }
    return StateReady
})(App)