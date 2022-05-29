(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.liandan.liandan"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        app.NewActives([
            app.NewActive("wd","","",false),
            app.NewPatrolActive("n;n;n;n;e;e","ask yu daiyan about 炼丹","",false),
            app.NewPatrolActive("s","","",false),
        ],"core.state.quest.wd.liandan.start").Start()
    }
    return State
})(App)