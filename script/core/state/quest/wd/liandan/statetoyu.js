(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.liandan.toyu"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        app.Move("n;n;n;n;e;e")
    }
    return State
})(App)