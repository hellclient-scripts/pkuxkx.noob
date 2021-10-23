(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateReady=function(){
        basicstate.call(this)
        this.ID="ready"
    }
    StateReady.prototype = Object.create(basicstate.prototype)
    StateReady.prototype.Enter=function(context,newstatue){
        basicstate.call(context,newstatue)
        if (!app.Running){
            app.ChangeState("manual")
            return
        }
    }
    StateReady.prototype.OnEvent=function(context,event,data){
    }
    return StateReady
})(App)