(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.liandan.fail"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.NewActives([
            App.NewPatrolActive("n;w;w;s;s;s;s","ask chongxu daozhang about cancel","",false),
        ]).Start()
    }
    return State
})(App)