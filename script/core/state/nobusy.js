(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="nobusy"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "nobusy":
                    App.Next()
            break
        }
    }
    State.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        world.EnableTimer("busy_retry",true)
        world.ResetTimer("busy_retry")
    }
    State.prototype.Leave=function(context,oldstatue){
        world.EnableTimer("busy_retry",false)
    }
    return State
})(App)