(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateInit=function(){
        basicstate.call(this)
        this.ID="init"
    }
    StateInit.prototype = Object.create(basicstate.prototype)
    StateInit.prototype.Enter=function(context,newstatue){
        basicstate.call(context,newstatue)
        world.Note("初始化状态")
        app.ChangeState("ready")
    }
    StateInit.prototype.OnEvent=function(context,event,data){
    }
    return StateInit
})(App)