(function(){
    let Valuing=Include("include/valuing.js")
    let Yu=function(){
        this.ID="yu"
    }
    let yulist={
        "独山玉":true,
        "岫岩玉":true,
        "和田玉":true,
        "蓝田玉":true,
        "青玉碎片":true,
        "黄玉碎片":true,
        "墨玉碎片":true,
        "赤玉碎片":true,
    }
    Yu.prototype = Object.create(Valuing.prototype)
    Yu.prototype.Value=function(obj,asset){
        if (yulist[obj.Name]){
                asset.AddType("玉")
        }
    }
    return Yu
})()