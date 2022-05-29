(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.liandan.success"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        app.NewActives([
            app.NewPatrolActive("n","ask yu daiyan about 炼丹","",false),
            app.NewPatrolActive("w;w;s;s;s;s","ask chongxu daozhang about success","",false),
        ]).Start()
    }
    return State
})(App)