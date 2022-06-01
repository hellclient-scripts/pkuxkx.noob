(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateCheckitem=function(){
        basicstate.call(this)
        this.ID="checkitem"
    }
    StateCheckitem.prototype = Object.create(basicstate.prototype)
    StateCheckitem.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        App.Send("i2")
        App.ResponseReady()
    }
    return StateCheckitem
})(App)