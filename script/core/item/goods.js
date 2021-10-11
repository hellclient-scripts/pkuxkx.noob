(function (app) {
    let Item = Include("core/item/item.js")
    let Goods = function () {
        Item.call(this)
        this.Type="goods"
    }
    Goods.prototype = Object.create(Item.prototype)
    return Goods
})(App)