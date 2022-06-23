(function(){
    let basemode=Include("core/shoppingmode/wenbao.js")
    let ShoppingMode=function(){
        basemode.call(this)
        this.ID="中产阶级"
    }
    ShoppingMode.prototype = Object.create(basemode.prototype)
    ShoppingMode.prototype.Tags=function(){
        return basemode.prototype.Tags().concat(["train"])
    }
    ShoppingMode.prototype.GoldMin=function(){
        return 10
    }
    return ShoppingMode
})()