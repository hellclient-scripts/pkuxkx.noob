(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateReady=function(){
        basicstate.call(this)
        this.ID="ready"
    }
    StateReady.prototype = Object.create(basicstate.prototype)
    StateReady.prototype.Enter=function(context,newstatue){
        basicstate.prototype.Enter.call(this,context,newstatue)
        if (!app.Running){
            app.ChangeState("manual")
            return
        }
        app.ChangeState("check")
    }
    return StateReady
})(App)