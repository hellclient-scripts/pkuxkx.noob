(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.zhen.enterfail"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.Pop()
        App.Push("core.state.quest.wd.zhen.zhen")
        App.Next()
    }
    return State
})(App)