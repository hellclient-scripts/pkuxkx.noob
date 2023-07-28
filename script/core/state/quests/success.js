(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quests.success"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.Raise("quest.set","")
        App.Core.Quest.SetOnline(null)
        App.Core.Quest.Remain=[...App.Core.Quest.Queue]
        App.Next()
    }
    return State
})(App)