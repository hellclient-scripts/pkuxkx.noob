(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.liandan.askyu"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        app.Send("ask yu daiyan about 炼丹")
        app.Ready()
    }
    return State
})(App)