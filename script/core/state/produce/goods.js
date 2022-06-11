(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let StateGoods=function(){
        basicstate.call(this)
        this.ID="goods"
    }
    StateGoods.prototype = Object.create(basicstate.prototype)
    StateGoods.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        let item=App.GetContext("Item")
        App.Commands([
            App.NewCommand("to",App.Options.NewWalk(item.Location)),
            App.NewCommand("nobusy"),
            App.NewCommand("do",item.Command),
            App.NewCommand("nobusy"),
        ]).Push()
        App.Next()
    }
    return StateGoods
})(App)