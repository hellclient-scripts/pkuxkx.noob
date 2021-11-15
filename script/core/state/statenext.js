(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateTransition=function(id,next){
        basicstate.call(this)
        this.ID=id
        this.Next=next
    }
    StateTransition.prototype = Object.create(basicstate.prototype)
    StateTransition.prototype.Enter=function(context,newstatue){
        basicstate.prototype.Enter.call(context,newstatue)
        this.Next()
    }
    return StateTransition
})(App)