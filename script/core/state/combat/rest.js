(function (App) {
    //你已经受伤过重，此时运功疗伤只怕立刻便有生命危险。

    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.combat.rest"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        Note("内力:"+App.Data.HP["eff_neili"]+" 气血:"+App.Core.PerQixue())
        if(App.Data.HP["eff_neili"]<App.GetParamNeiliMin()){
            App.Send("dazuo max;dazuo 10")
        }else if (App.Core.PerQixue()<App.GetNumberParam("heal_below")){
            App.Send("do 10 yun heal")
        }else if (App.Core.PerJing()<App.GetNumberParam("heal_below")){
            App.Send("do 10 yun inspire")
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