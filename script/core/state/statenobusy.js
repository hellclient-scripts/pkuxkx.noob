(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateNoBusy=function(){
        basicstate.call(this)
        this.ID="nobusy"
        this.Callback=""
    }
    StateNoBusy.prototype = Object.create(basicstate.prototype)
    StateNoBusy.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        app.CheckBusy(this.Callback)
    }
    return StateNoBusy
})(App)