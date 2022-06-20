(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quests.quests"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        if (App.Stopped||App.Core.Quest.Queue.length==0){
            App.Core.Quest.Queue=[]
            App.Core.Quest.Remain=[]
            App.Return()
            return
        }
        let loop=false
        if (App.Core.Quest.Remain.length==0){
            App.Core.Quest.Remain=[...App.Core.Quest.Queue]
            loop=true
        }
        let q=App.Core.Quest.Remain.shift()
        App.NewCommand("quest",q,"core.state.quests.success","core.state.quests.fail").Push()
        if (loop){
            App.NewCommand("delay",App.GetNumberParam("questsdelay")).Push()
        }
        App.Next()
    }
    return State
})(App)