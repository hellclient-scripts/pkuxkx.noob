(function(){
    let Valuing=Include("include/valuing.js")
    let Quest=function(){
        this.ID="quest"
    }
    let yulist={
        "天珠":true,
    }
    Quest.prototype = Object.create(Valuing.prototype)
    Quest.prototype.Value=function(obj,asset){
        if (yulist[obj.Name]){
                asset.AddType("任务物品")
        }
    }
    return Quest
})()