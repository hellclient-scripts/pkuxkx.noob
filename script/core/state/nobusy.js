(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="nobusy"
        this.Waiting=false
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "gmcp.nobusy":
                if (this.Waiting){
                    App.Next()
                }
            break
            case "nobusy":
                if (!this.Waiting){
                    App.Next()
                }
            break
            case "busy":
                this.Waiting=true
            break
        }
    }
    State.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        App.Core.CheckBusy()
        // world.EnableTimer("busy_retry",true)
        // world.ResetTimer("busy_retry")
    }
    State.prototype.Leave=function(context,oldstatue){
        world.EnableTimer("busy_retry",false)
    }
    return State
})(App)