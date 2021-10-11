(function (app) {
    let Item = Include("core/item/item.js")
    let Belongings = function () {
        Item.call(this)
        this.Type="belongings"
    }
    Belongings.prototype = Object.create(Item.prototype)
    return Belongings
})(App)