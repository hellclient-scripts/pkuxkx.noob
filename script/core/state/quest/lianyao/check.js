(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.lianyao.check"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        if (App.GetItemNumber("huo zhezi", true) < 1) {
            App.Send("out")
            App.ChangeState("core.state.quest.lianyao.buy")
            return
        }
        App.Send("unlock")
        for (var key in App.Quest.Lianyao.Formula) {
            if (App.GetItemNumber(key, true) < App.Quest.Lianyao.Formula[key]) {
                App.Send("out")
                App.ChangeState("core.state.quest.lianyao.buy")
                return
            }
        }
        App.Next()

    }
    return State
})(App)