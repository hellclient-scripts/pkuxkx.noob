(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateInit=function(){
        basicstate.call(this)
        this.ID="init"
    }
    StateInit.prototype = Object.create(basicstate.prototype)
    StateInit.prototype.Enter=function(Context,newstatue){
        world.Note("初始化状态")
    }
    StateInit.prototype.OnEvent=function(context,event,data){
    }
    return StateInit
})(App)