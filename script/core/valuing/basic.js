(function(){
    let Valuing=Include("include/valuing.js")
    let Basic=function(){
        this.ID="basic"
    }
    Basic.prototype = Object.create(Valuing.prototype)
    Basic.prototype.Value=function(obj,asset){
        asset.Name=obj.Name
        asset.ID=obj.ID
        asset.UNID=obj.UNID||""
        asset.Count=obj.Count
        asset.Binded=obj.Binded
    }
    return Basic
})()