(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.actives.ready"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let actives=app.GetContext("Actives")
        if (actives.length==0){
            app.Finish()
            return
        }
        actives.shift().WithFinalState("core.state.actives.step").Start()
    }
    return State
})(App)