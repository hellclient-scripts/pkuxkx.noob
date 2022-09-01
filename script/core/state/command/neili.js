(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.command.neili"
    }
    State.prototype = Object.create(basicstate.prototype)
    let Dazuo=function(data){
        let num=data-App.Data.HP["eff_neili"]
        let cap=Math.floor(App.Data.HP["eff_qixue"]*0.9)
        if (num>cap){
            num=cap
        }
        if (num<10){
            num=10
        }
        App.Eat()
        App.Send("dazuo "+num)
    }
    State.prototype.Enter=function(context,oldstatue){
        let data=App.GetContext("Neili")-0
        if (App.Data.HP["eff_neili"]<data){
            App.Commands([
                App.NewCommand("function",function(){
                    Dazuo(data)
                    App.Next()
                }),
                App.NewCommand("nobusy"),
                App.NewCommand("state",this.ID),
            ]).Push()
        }
        App.Next()
    }
    return State
})(App)