(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.combat.combat"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        world.EnableTimer("App.Core.Combat.OnTick",true)
        App.Core.Combat.Current.Perform()
        App.Core.Combat.CheckFighting()
    }
    State.prototype.Leave=function(context,oldstatue){
        world.EnableTimer("App.Core.Combat.OnTick",false)
    }
    State.prototype.OnEvent=function(context,event,data){
        switch(event){
        case "combat.tick":
            App.Send("checkbusy")
            App.Core.Combat.CheckFighting()
            break
        case "state.nobusy":
            App.Core.Combat.Current.Perform()
            break
        case "combat.finish":
            App.Commands([
                App.NewCommand("do","hpbrief"),
                App.NewCommand("nobusy"),
                App.NewCommand("state","core.state.combat.rest"),
            ]).Push()
            App.Next()
            break
        }
    }
    return State
})(App)