(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.zhen.zhen"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.Quest.WD.Zhen.Dir=RandomKey(App.Quest.WD.Zhen.Locations)
        App.Quest.WD.Zhen.Back=App.Quest.WD.Zhen.Locations[App.Quest.WD.Zhen.Dir]

        App.Commands([
            App.NewCommand("patrol",App.Options.NewPath(App.Quest.WD.Zhen.Dir),"","core.state.quest.wd.zhen.enterfail"),
            App.NewCommand("state","core.state.quest.wd.zhen.enter"),
            App.NewCommand("patrol",App.Options.NewPath(App.Quest.WD.Zhen.Back)),
            App.NewCommand("ask",App.Quest.WD.QuestionSuccess),
            App.NewCommand("ask",App.Quest.WD.QuestionCancel),
        ]).Push()
        App.Next()
    }
    State.prototype.Leave=function(context,oldstatue){
        Userinput.hideall()
    }
    return State
})(App)