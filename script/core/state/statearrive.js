(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateArrive=function(){
        basicstate.call(this)
        this.ID="arrive"
    }
    StateArrive.prototype = Object.create(basicstate.prototype)
})(App)