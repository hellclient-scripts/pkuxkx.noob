(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.chanting.chanting"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.Push([
            "core.state.quest.wd.chanting.find",
        ])
        App.NewActive("wd-fzg2f","jie "+App.Quest.WD.Chanting.Quest.Book,"",true).Start()
    }
    return State
})(App)