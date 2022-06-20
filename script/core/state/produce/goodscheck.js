(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let StateGoods=function(){
        basicstate.call(this)
        this.ID="core.produce.goodscheck"
    }
    StateGoods.prototype = Object.create(basicstate.prototype)
    StateGoods.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        let item=App.GetContext("Item")
        let amount=App.GetContext("Amount")
        if (App.GetItemNumber(item.Name,true)<amount){
            App.Push(["goods"]).WithData("Item",item).WithData("Amount",amount)
        }
        App.Next()
    }
    return StateGoods
})(App)