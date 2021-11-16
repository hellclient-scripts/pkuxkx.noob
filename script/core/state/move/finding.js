(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateFinding=function(){
        basicstate.call(this)
        this.ID="finding"
    }
    StateFinding.prototype = Object.create(basicstate.prototype)
    StateFinding.prototype.Enter=function(context,oldstatue){
        let move=app.GetContext("Move")
        let data=move.Data
        if (data && !data.Found) {
            let obj = data["Obj"]
            if (!obj) {
                this.Move()
                return
            }
            if (!App.HasRoomObj(obj)) {
                this.Move()
                return 
            }
            data.Found = true
            app.Finish()
            return
        }
        this.Move()
    }
    StateFinding.prototype.Move=function(){
        let s=app.LastState()
        if (!s){
            app.Fail()
            return
        }
        app.ChangeState(s.ID)
    }
    return StateFinding
})(App)