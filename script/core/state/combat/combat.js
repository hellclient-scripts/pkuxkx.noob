(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.combat.combat"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        world.EnableTimer("App.Core.Combat.OnTick",true)
    }
    State.prototype.Level=function(context,oldstatue){
        world.EnableTimer("App.Core.Combat.OnTick",false)
    }
    State.prototype.OnEvent=function(context,event,data){
        switch(event){
        case "core.tick":
            App.Core.Combat.Current.Perform()
            break
        }
    }
    return State
})(App)