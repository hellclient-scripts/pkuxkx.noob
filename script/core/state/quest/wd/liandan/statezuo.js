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
            if (app.Data.Puzzle.Answer!=""){
                app.Send(app.Data.Puzzle.Answer)
            }
            break
        case "quest.wd.liandan.success":
            app.Finish()
            break
        case "quest.wd.liandan.fail":
            app.Fail()
            break
        }
    }
    StateZuo.prototype.ShowPuzzle=function(){
        app.Core.Puzzle.Show("丹炉状态","根据丹炉颜色选择操作",app.Quest.WD.Liandan.Danlu,app.Quest.WD.Liandan.Items)
    }
    StateZuo.prototype.Enter=function(context,oldstatue){
        app.Send("zuo;kan")
    }
    StateZuo.prototype.Leave=function(context,oldstatue){
        app.Send("zhan")
    }
    return StateZuo
})(App)