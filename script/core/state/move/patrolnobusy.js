(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let StatePatrolNobusy=function(){
        basicstate.call(this)
        this.ID="patrolnobusy"
    }
    StatePatrolNobusy.prototype = Object.create(basicstate.prototype)
    StatePatrolNobusy.prototype.Enter=function(context,oldstatue){
        let s=App.LastState()
        if (!s){
            App.Fail()
            return
        }
        App.ChangeState(s.ID)
    }
    return StatePatrolNobusy
})(App)