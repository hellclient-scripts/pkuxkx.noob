(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.actives.step"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        app.ChangeState("core.state.actives.ready")
    }
    return State
})(App)