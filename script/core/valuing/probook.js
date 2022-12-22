(function(){
    let Valuing=Include("include/valuing.js")
    let ProBook=function(){
        this.ID="probook"
    }
    ProBook.prototype = Object.create(Valuing.prototype)
    ProBook.prototype.Value=function(obj,asset){
        if (obj.ID&&obj.ID.toLowerCase()=="pro book"){
            asset.AddType("技能书")
        }
    }
    return ProBook
})()