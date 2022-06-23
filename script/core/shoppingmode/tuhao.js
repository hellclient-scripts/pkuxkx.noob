(function(){
    let basemode=Include("core/shoppingmode/zhongchan.js")
    let ShoppingMode=function(){
        basemode.call(this)
        this.ID="土豪阶级"
    }
    ShoppingMode.prototype = Object.create(basemode.prototype)
    ShoppingMode.prototype.Tags=function(){
        return basemode.prototype.Tags().concat(["bus"])
    }
    ShoppingMode.prototype.GoldMin=function(){
        return 100
    }
    return ShoppingMode
})()