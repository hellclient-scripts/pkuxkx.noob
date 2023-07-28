(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quests.quests"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        if (App.Core.Quest.Pending){
            let q=App.Core.Quest.Pending
            App.Core.Quest.Pending=""
            App.Insert([this.ID])
            App.NewCommand("quest",q,"core.state.quests.success","core.state.quests.fail").Push()
            App.Next()
            return
        }
        if (App.Stopped||App.Core.Quest.Queue.length==0){
            App.Core.Quest.Queue=[]
            App.Core.Quest.Remain=[]
            App.Automaton.Flush()
            App.Next()
            return
        }
        let loop=false
        if (App.Core.Quest.Remain.length==0){
            App.Core.Quest.Remain=[...App.Core.Quest.Queue]
            loop=true
        }
        App.Insert([this.ID])
        let delay=App.Core.OverheatMode.Current().Delay()
        if (delay>0){
            Note("水温过高，进入冷却"+delay+"秒。")
            App.NewCommand("delay",delay).Push()
            App.Next()
            return
        }
        let q=App.Core.Condition.MatchCmd(App.Core.Quest.Remain.shift())
        if (q!=""){
            App.NewCommand("quest",q,"core.state.quests.success","core.state.quests.fail").Push()
        }
        if (loop){
            App.Raise("quests.loop")
            App.Raise("core.looping")
            App.NewCommand("delay",App.GetNumberParam("questsdelay")).Push()
        }
        App.Next()
    }
    return State
})(App)