(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let find=function(){
        App.Core.Traversal.New("quest.wd.chanting")
        App.Data.Traversal.Type="room"
        App.Data.Traversal.Target=App.Quest.WD.Chanting.Quest.Location
        App.Core.Traversal.Prompt()
    }
    let check=function(){
        if (App.GetItemByName(App.Quest.WD.Chanting.Quest.Book,true)){
            App.Next()
        }else{
            Note("借书失败")
            App.Fail()
        }
    }
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.chanting.chanting"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){

        App.Commands([
            App.NewCommand("to",App.Options.NewWalk("wd-fzg2f")),
            App.NewCommand("do","give all to zhike daozhang"),
            App.NewCommand("ask",App.Options.NewQuestion("zhike daozhang","遗失",1)),
            App.NewCommand("do","jie "+App.Quest.WD.Chanting.Quest.Book+";i2"),
            App.NewCommand("nobusy"),
            App.NewCommand("function",check),
            App.NewCommand("function",find),
            App.NewCommand("state","core.state.quest.wd.chanting.read"),
            App.NewCommand("function",App.Core.Traversal.Finish),
            App.NewCommand("to",App.Options.NewWalk("wd-fzg2f")),
            App.NewCommand("do","give all to zhike daozhang"),
            App.NewCommand("nobusy"),
            App.NewCommand("to",App.Options.NewWalk("wd")),
            App.NewCommand("ask",App.Quest.WD.QuestionSuccess),
        ]).Push()
        App.Next()
    }
    return State
})(App)