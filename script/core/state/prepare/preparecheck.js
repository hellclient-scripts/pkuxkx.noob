(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let StatePrepareCheck=function(){
        basicstate.call(this)
        this.ID="core.state.prepare.check"
    }
    StatePrepareCheck.prototype = Object.create(basicstate.prototype)
    StatePrepareCheck.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        let prepare=App.GetContext("Prepare")
        prepare.Check()
        App.ResponseReady()
    }
    return StatePrepareCheck
})(App)