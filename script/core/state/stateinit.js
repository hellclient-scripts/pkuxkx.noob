(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let StateInit=function(){
        basicstate.call(this)
        this.ID="init"
    }
    StateInit.prototype = Object.create(basicstate.prototype)
    StateInit.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        world.Note("初始化状态")
        App.Next()
    }
    StateInit.prototype.OnEvent=function(context,event,data){
    }
    return StateInit
})(App)