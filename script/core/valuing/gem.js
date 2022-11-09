(function(){
    let Valuing=Include("include/valuing.js")
    let Gem=function(){
        this.ID="gem"
    }
    let grades={
        "地":1,
        "山":2,
        "水":3,
        "风":4,
        "雷":5,
        "火":6,
        "泽":7,
        "天":8,
    }
    let gemre="^([地|山|水|风|雷|火|泽|天])([☆|◎|★])(日魂|月魄|精金|木灵|玄冰|炎晶|玉髓|神龙骨|凤凰羽|麒麟角|玄武甲)$"
    Gem.prototype = Object.create(Valuing.prototype)
    Gem.prototype.Value=function(obj,asset){
        let result=obj.Name.match(gemre)
        if (result){
                asset.AddType("宝石")
                asset.AddType(result[3])
                asset.Grade=grades[result[1]]
                asset.StoreType="pack"
                asset.StoreType="jindian"
        }
    }
    return Gem
})()