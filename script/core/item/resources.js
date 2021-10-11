(function (app) {
    let Item = Include("core/item/item.js")
    let Resources = function () {
        Item.call(this)
        this.Type="resources"
    }
    Resources.prototype = Object.create(Item.prototype)
    return Resources
})(App)