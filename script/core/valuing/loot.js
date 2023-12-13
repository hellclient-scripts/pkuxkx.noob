(function(){
    let Valuing=Include("include/valuing.js")
    let Gudong=function(){
        this.ID="loot"
    }
    let list={
        "铁甲":true,
    }
    Gudong.prototype = Object.create(Valuing.prototype)
    Gudong.prototype.Value=function(obj,asset){
        if (list[obj.Name]){
                asset.AddType("垃圾")
        }
    }
    return Gudong
})()