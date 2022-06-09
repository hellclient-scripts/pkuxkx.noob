(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.chanting.read"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        if (App.Data.Room.Name!=App.Quest.WD.Chanting.Quest.Location){
            App.Next()
            return
        }
        App.Quest.WD.Chanting.PageDown(0)
    }
    State.prototype.OnEvent=function(context,event,data){
        switch(event){
        case "quest.wd.chanting.onbook":
            if (App.Quest.WD.Chanting.Book.Label!=App.Quest.WD.Chanting.Quest.Label){
                App.Quest.WD.Chanting.PageDown(5)
                return
            }
            if (App.Quest.WD.Chanting.Book.Section!=App.Quest.WD.Chanting.Quest.Section){
                App.Quest.WD.Chanting.PageDown(App.Quest.WD.Chanting.Quest.Section-App.Quest.WD.Chanting.Book.Section)
                return
            }
            App.Quest.WD.Chanting.ChantingCurrent()
            App.CheckBusy("core.state.quest.wd.chanting.readfinish")
            break;
        }
    }
    App.RegisterCallback("core.state.quest.wd.chanting.readfinish",function(){
        App.Next()
    })
    return State
})(App)