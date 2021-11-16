(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StatePatrolNobusy=function(){
        basicstate.call(this)
        this.ID="patrolnobusy"
    }
    StatePatrolNobusy.prototype = Object.create(basicstate.prototype)
    StatePatrolNobusy.prototype.Enter=function(context,oldstatue){
        let s=app.LastState()
        if (!s){
            app.Fail()
            return
        }
        app.ChangeState(s.ID)
    }
    return StatePatrolNobusy
})(App)