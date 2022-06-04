(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.liandan.start"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.Push(["core.state.quest.wd.liandan.zuo"],"core.state.quest.wd.liandan.success").WithFailState("core.state.quest.wd.liandan.fail")
        App.Next()
    }
    return State
})(App)