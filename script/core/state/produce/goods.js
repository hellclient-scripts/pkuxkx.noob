(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateGoods=function(){
        basicstate.call(this)
        this.ID="goods"
    }
    StateGoods.prototype = Object.create(basicstate.prototype)
    StateGoods.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        let item=App.GetContext("Item")
        let a=App.NewActive(item.Location,item.Command,"",true)
        a.WithData(item)
        a.Start()
    }
    return StateGoods
})(App)