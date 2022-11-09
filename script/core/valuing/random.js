(function(){
    let Valuing=Include("include/valuing.js")
    let Pro=function(){
        this.ID="pro"
    }
    var prefix={
        "机杼":1,
        "苍野":2,
        "青幽":3,
        "百战":4,
        "鬼烈":5,
        "巨灵":6,
        "深罡":7,
        "九日":8,

        "沉水":1,
        "赤焰":2,
        "荡寇":3,
        "彗月":4,
        "照夜":5,
        "追日":6,
        "断阙":7,
        "刑天":8,

        "恶来":1,
        "玄狐":2,
        "洛神":3,
        "盘瓠":4,
        "儵忽":5,
        "帝江":6,
        "烛阴":7,
        "盘古":8,        
    }
    var suff={
        "盔":["帽子","防具"],
        "面具":["护面","防具"],
        "护腕":["护腕","防具"],
        "披风":["披风","防具"],
        "护手":["手套","防具"],
        "护肩":["护肩","防具"],
        "布甲":["铠甲","防具"],
        "板甲":["铠甲","防具"],
        "袍":["衣服","防具"],
        "腰带":["腰带","防具"],
        "盾":["盾牌","防具"],
        "腿甲":["护腿","防具"],
        "靴":["鞋子","防具"],

        "项链":["项链","饰品"],
        "戒指":["戒指","饰品"],
        "护心":["护心","饰品"],

        "剑":["剑","武器"],
        "刀":["刀","武器"],
        "杖":["杖","武器"],
        "鞭":["鞭","武器"],
        "斧":["斧","武器"],
        "枪":["枪","武器"],
        "锤":["锤","武器"],
        "戟":["戟","武器"],
        "匕":["匕","武器"],
        "针":["针","剑","武器"],
        "箫":["箫","剑","武器"],
        "钩":["钩","刀","武器"],
    }
    Pro.prototype = Object.create(Valuing.prototype)
    Pro.prototype.Value=function(obj,asset){
        let data=SplitN(obj.Name,"之",2)
        if (data.length==2){
            let pro=prefix[data[0]]
            if (pro){
                asset.AddType("职业")
                asset.AddType(pro[0])
                asset.Level=pro[1]
                let atype=suff[data[1]]
                if (atype){
                    asset.AddTypes(atype)
                }
                asset.StoreType="rbz"
                asset.StoreType="rbz"
            }

        }
    }
    return Pro
})()