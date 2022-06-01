(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.zhen.enter"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        app.Send("zhenfa")
    }
    State.prototype.ShowPuzzle=function(){
        App.Core.Puzzle.ShowText("wd.zhenfa","阵法npc状态","根据丹炉颜色选择操作",App.Quest.WD.Zhen.NPC,App.Quest.WD.Zhen.Items)
    }
    State.prototype.OnEvent=function(context,event,data){
        switch(event){
        case "quest.wd.zhen.move":
            if (Object.keys(App.Quest.WD.Zhen.Free).length==1){
                this.ShowPuzzle()
            }
            break;
        case "puzzle.answer":
            if (App.Data.Puzzle.Answer!=""){
                App.Send(App.Data.Puzzle.Answer)
            }
            break
        case "quest.wd.zhen.success":
            App.Finish()
            break
        case "quest.wd.zhen.fail":
            App.Fail()
            break
        }
    }

    return State
})(App)