(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.liandan.liandan"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        app.NewActives(
            app.NewActive("wd","","",false),
        ).Start()
        app.Push([
            "core.state.quest.wd.liandan.start",
            "core.state.quest.wd.liandan.toyu",
            "core.state.quest.wd.liandan.askyu",
            "core.state.quest.wd.liandan.tozuo",
            "core.state.quest.wd.liandan.zuo",
        ])
        app.Ready()
    }
    return State
})(App)