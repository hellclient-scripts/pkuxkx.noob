(function (App) {
    let movestate = Include("core/state/active/activemove.js")
    let State=function(){
        movestate.call(this)
        this.ID="core.state.active.patrol"
        this.Move="patrol"
    }
    State.prototype = Object.create(movestate.prototype)
    return State
})(App)