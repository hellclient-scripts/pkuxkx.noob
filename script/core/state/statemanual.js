(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateManual=function(){
        basicstate.call(this)
        this.ID="manual"
    }
    StateManual.prototype = Object.create(basicstate.prototype)
    StateManual.prototype.Enter=function(Context,newstatue){
        world.Note("进入手动模式")
    }
    StateManual.prototype.OnEvent=function(context,event,data){
    }
    return StateManual
})(App)