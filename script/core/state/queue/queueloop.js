(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateQueueLoop=function(){
        basicstate.call(this)
        this.ID="core.state.queue.loop"
    }
    StateQueueLoop.prototype = Object.create(basicstate.prototype)
    StateQueueLoop.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        app.ChangeState("core.state.queue.next")
    }
    return StateQueueLoop
})(App)