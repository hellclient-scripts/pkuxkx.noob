(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.liandan.liandan"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.NewActives([
            App.NewActive("wd","","",false),
            App.NewPatrolActive("n;n;n;n;e;e","ask yu daiyan about 炼丹","",false),
            App.NewPatrolActive("s","","",false),
        ],"core.state.quest.wd.liandan.start").Start()
    }
    return State
})(App)