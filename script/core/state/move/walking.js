(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="walking"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let s=App.LastState()
        if (!s){
            App.Fail()
            return
        }
        App.ChangeState(s.ID)
    }
    return State
})(App)