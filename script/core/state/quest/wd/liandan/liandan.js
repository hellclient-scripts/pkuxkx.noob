(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.liandan.liandan"
    }
    QuestionLiandan=App.Options.NewQuestion("yu daiyan","炼丹")

    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.Commands([
            App.NewCommand("to",App.Options.NewWalk("wd")),
            App.NewCommand("patrol",App.Options.NewPath("n;n;n;n;e;e")),
            App.NewCommand("ask",QuestionLiandan),
            App.NewCommand("patrol",App.Options.NewPath("s")),
            App.NewCommand("state","core.state.quest.wd.liandan.zuo"),
            App.NewCommand("patrol",App.Options.NewPath("n")),
            App.NewCommand("ask",QuestionLiandan),
            App.NewCommand("patrol",App.Options.NewPath("w;w;s;s;s;s")),
            App.NewCommand("ask",App.Quest.WD.QuestionSuccess),
            App.NewCommand("ask",App.Quest.WD.QuestionCancel),
        ]).Push()
        App.Next()
    }
    return State
})(App)