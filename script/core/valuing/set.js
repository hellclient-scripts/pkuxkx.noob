(function(){
    let Valuing=Include("include/valuing.js")
    let excluded={
        "阿修罗侍者之心":true,
        "阿修罗侍者之眼":true,
        "垂丝海棠":true
    }
    let sets=[
        "帝释天",
        "五圣",
        "阿修罗",
        "佛骨",
        "焚情",
        "图穷",
        "神驼",
        "垂丝海棠",
        "剑歌",
        "南海鳄神"
    ]
    let Set=function(){
        this.ID="set"
    }
    Set.prototype = Object.create(Valuing.prototype)
    Set.prototype.Value=function(obj,asset){
        if (obj.ID&&obj.ID.indexOf(" ")>-1){
            if (excluded[obj.Name]){
                return
            }
            for (var i=0;i<sets.length;i++){
                if (obj.Name.startsWith(sets[i])){
                    asset.AddType("套装")
                    asset.AddType(sets[i]+"套")
                    asset.StoreType="rbz"
                    asset.SellType="rbz"    
                    return
                }
            }
        }
    }
    return Set
})()