(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.combat.kill"
        this.Cmd="kill"
        this.CommandsName="combat"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.Core.Combat.Current=new combat()
        App.Core.Combat.Current.SetCommands(App.Core.Combat.GetCommands(this.CommandsName))
        App.Send(this.Cmd+App.GetContenxt("Target"))
        App.ChangeState("core.state.combat.combat")
    }
    return State
})(App)