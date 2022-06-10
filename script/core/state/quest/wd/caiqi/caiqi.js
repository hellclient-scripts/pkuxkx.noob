(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.caiqi.caiqi"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.Commands([
            App.NewCommand("to",App.Options.NewWalk("wd-tzfx")),
            App.NewCommand("do","caiqi"),
            App.NewCommand("nobusy"),
            App.NewCommand("to",App.Options.NewWalk("wd")),
            App.NewCommand("ask",App.Quest.WD.QuestionSuccess),
        ]).Push()
        App.Next()
    }
    return State
})(App)