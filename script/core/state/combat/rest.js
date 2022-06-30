(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.combat.rest"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        if(App.Data.HP["eff_neili"]<App.GetParamNeiliMin()){
            App.Send("dazuo max;dazuo 10")
        }else if (App.Data.HP["per_qixue"]<App.GetNumberParam("heal_below")){
            App.Send("yun heal")
        }else{
            App.Next()
            return
        }
        App.Commands([
            App.NewCommand("nobusy"),
            App.NewCommand("do","yun recover"),
            App.NewCommand("nobusy"),
            App.NewCommand("delay",1),
            App.NewCommand("state",this.ID)
        ]).Push()
        App.Next()
    }
    return State
})(App)