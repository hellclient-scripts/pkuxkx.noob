(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let StateFinding=function(){
        basicstate.call(this)
        this.ID="finding"
        this.MoveState="patroling"
    }
    StateFinding.prototype = Object.create(basicstate.prototype)
    StateFinding.prototype.Check=function(){
        let move=App.GetContext("Move")
        let data=move.Data
        if (data && !data.Found) {
            data.Check()
            if (!data.Found) {
                this.Move()
                return
            }
            App.Next()
            return 
        }
        this.Move()
    }
    StateFinding.prototype.Enter=function(context,oldstatue){
        this.Check()
    }
    StateFinding.prototype.Move=function(){
        App.ChangeState(this.MoveState)
    }
    return StateFinding
})(App)