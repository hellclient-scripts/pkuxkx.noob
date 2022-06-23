(function(){
    let basemode=Include("core/shoppingmode/shoppingmode.js")
    let ShoppingMode=function(){
        basemode.call(this)
        this.ID="仅够温饱"
    }
    ShoppingMode.prototype = Object.create(basemode.prototype)
    ShoppingMode.prototype.CanBuySupplies=function(){
        return true
    }
    ShoppingMode.prototype.Tags=function(){
        return ["sail"]
    }
    ShoppingMode.prototype.GoldMin=function(){
        return 1
    }
    return ShoppingMode
})()