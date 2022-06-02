(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.zhen.move"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.NewPatrolActive(App.Quest.WD.Zhen.Dir,"","",false).WithFailState("core.state.quest.wd.zhen.zhen").Start()
    }
    return State
})(App)