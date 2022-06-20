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
        let amount=App.GetContext("Amount")
        App.Commands([
            App.NewCommand("to",App.Options.NewWalk(item.Location)),
            App.NewCommand("nobusy"),
            App.NewCommand("do",item.Command),
            App.NewCommand("nobusy"),
            App.NewCommand("do","i2"),
            App.NewCommand("rest"),
            App.NewCommand("function",function(){
                App.Push(["core.produce.goodscheck"]).WithData("Item",item).WithData("Amount",amount)
                App.Next()
            }),
        ]).Push()
        App.Next()
    }
    return StateGoods
})(App)