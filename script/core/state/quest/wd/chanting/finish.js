(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.chanting.finish"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.PushAsk(App.Quest.WD.QuestionCancel)
        App.PushAsk(App.Quest.WD.QuestionSuccess)
        App.NewActive("wd","","",true).Push()
        App.NewActive("wd-fzg2f","give all to zhike daozhang","",true).Push()
        App.Next()
    }
    return State
})(App)