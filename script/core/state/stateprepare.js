(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StatePrepare=function(){
        basicstate.call(this)
        this.ID="prepare"
    }
    StatePrepare.prototype = Object.create(basicstate.prototype)
    StatePrepare.prototype.Enter=function(context,newstatue){
        basicstate.prototype.Entercall(context,newstatue)
   
    }

    return StatePrepare
})(App)