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
        let a=App.Push(["core.state.quest.wd.zhen.move","core.state.quest.wd.zhen.enter","core.state.quest.wd.zhen.success"])
        a.WithFailState("core.state.quest.wd.zhen.cancel")
        App.Next()
    }
    State.prototype.Leave=function(context,oldstatue){
        Userinput.hideall()
    }
    return State
})(App)