(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.actives.ready"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        if (context.Actives.length==0){
            app.Finish()
            return
        }
        app.Push("core.state.actives.step")
        context.Actives.shift().Start()
    }
    return State
})(App)