(function(){
    let ShoppingMode=function(){
        this.ID="一穷二白"
    }
    ShoppingMode.prototype.CanBuySupplies=function(){
        return false
    }
    ShoppingMode.prototype.Tags=function(){
        return []
    }
    ShoppingMode.prototype.GoldMin=function(){
        return 0
    }
    return ShoppingMode
})()