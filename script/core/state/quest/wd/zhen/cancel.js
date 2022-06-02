(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.zhen.cancel"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.NewPatrolActive(App.Quest.WD.Zhen.Back,"ask chongxu daozhang about cancel","",false).Start()
    }
    return State
})(App)