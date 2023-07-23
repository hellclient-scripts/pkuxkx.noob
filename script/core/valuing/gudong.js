(function(){
    let Valuing=Include("include/valuing.js")
    let Gudong=function(){
        this.ID="yu"
    }
    let gudonglist={
        "字画":true,
        "古玩":true,
    }
    Gudong.prototype = Object.create(Valuing.prototype)
    Gudong.prototype.Value=function(obj,asset){
        if (gudonglist[obj.Name]){
                asset.AddType("古董")
        }
    }
    return Gudong
})()