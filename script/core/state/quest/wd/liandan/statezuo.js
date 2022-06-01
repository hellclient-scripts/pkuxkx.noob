(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateZuo=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.liandan.zuo"
    }
    StateZuo.prototype = Object.create(basicstate.prototype)
    StateZuo.prototype.OnEvent=function(context,event,data){
        switch(event){
        case "quest.wd.liandan.danlu":
            this.ShowPuzzle()
            break;
        case "puzzle.answer":
            if (App.Data.Puzzle.Answer!=""){
                App.Send(App.Data.Puzzle.Answer)
            }
            Userinput.hideall()
            break
        case "quest.wd.liandan.success":
            App.Finish()
            break
        case "quest.wd.liandan.fail":
            App.Fail()
            break
        }
    }
    StateZuo.prototype.ShowPuzzle=function(){
        App.Core.Puzzle.Show("wd.danlu","丹炉状态","根据丹炉颜色选择操作",App.Quest.WD.Liandan.Danlu,App.Quest.WD.Liandan.Items)
    }
    StateZuo.prototype.Enter=function(context,oldstatue){
        App.Send("zuo;kan")
    }
    StateZuo.prototype.Leave=function(context,oldstatue){
        App.Send("zhan")
    }
    return StateZuo
})(App)