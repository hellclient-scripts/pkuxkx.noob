(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.chanting.find"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.Push([
            "core.state.quest.wd.chanting.read",
            "core.state.quest.wd.chanting.back",
            "core.state.quest.wd.chanting.finish",
        ])
        App.Core.Traversal.New()
        App.Data.Traversal.Type="room"
        App.Data.Traversal.Target=App.Quest.WD.Chanting.Quest.Location
        App.Core.Traversal.Prompt()
    }
    return State
})(App)