(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateStart=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.liandan.start"
    }
    StateStart.prototype = Object.create(basicstate.prototype)
    StateStart.prototype.Enter=function(context,oldstatue){
        app.NewActive("wd","","",false).Start()
    }
    return StateStart
})(App)