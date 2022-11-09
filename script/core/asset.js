(function(App){
    let Action = Include("include/action.js")
    let Asset = Include("include/asset.js")
    let Valuation = Include("include/valuation.js")
    App.Core.Asset={}
    App.Data.AssetList=[]
    App.Core.Valuation=null
    App.Core.Asset.LoadActions=function(data){
        let lines=data.split("\n")
        let result=[]
        for(var i=0;i<lines.length;i++){
            let line=lines[i].trim()
            if (line){
                let action=new Action(line)
                    result.push(action)
                }
            }
            return result
    }
    App.Core.Asset.Valuings=[]
    App.Core.Asset.RegisterValuing=function(valuing){
        App.Core.Asset.Valuings.push(valuing)
    }
    
    let defaultactions=App.Core.Asset.LoadActions([
        "#weight 30",
        "#treasure 职业,随机,套装,技能书,宝石",
        "#store type=套装",
        "#store type=技能书",
        "hole 1,quality 4>#store type=职业",
        "!hole 2>#sell type=随机",
        "!hole 2>#sell type=职业",
        "#keep puti zi,qiannian dan,long dan,nvwa shi",
        "quit:#sell xue jiedan",
        "relogin:#sell xue jiedan",
        "#sell.5 xue jiedan",
        "#store type=宝石",
        "#sell nen cao,sui rouxie",
        "quit:#sell wushi dao,dulong bian",
        "#drop shi tan,xuan bing,"
    ].join("\n"))
    let autoActions=[...defaultactions]
    App.Core.Asset.OnItemStart=function(name, output, wildcards){
        switch(wildcards[0]){
            case "装  备":
                App.Data.AssetList=[]
                App.Core.Asset.CurrentType=""
                world.EnableTriggerGroup("core.asset.item",false)
                break
            case "财  宝":
                App.Core.Asset.CurrentType="treasure"
                world.EnableTriggerGroup("core.asset.item",true)
                break
            case "食  物":
                    App.Core.Asset.CurrentType="treasure"
                    world.EnableTriggerGroup("core.asset.item",true)
                    break                
            case "其  它":
                App.Core.Asset.CurrentType="item"
                world.EnableTriggerGroup("core.asset.item",true)
                break 
            default:
                App.Core.Asset.CurrentType=""
                world.EnableTriggerGroup("core.asset.item",false)
                break
        }
    }
    let itemsre=/^│(\s*＊{0,1}[^()×＋]+＋{0,1}(\([^()]+\)){0,1}(×\d+){0,1}\s+)*│$/
    let itemre=/(＊{0,1})([^ ()×＋]+)(＋{0,1})(\(([^()]+)\)){0,1}(×(\d+)){0,1}/g
    App.Core.Asset.OnItem=function(name, output, wildcards){
        let result=output.match(itemsre)
        if (result==null){
            world.EnableTriggerGroup("core.asset.item",false)
            return
        }
        let data=output.slice(1,-1)
        let items=[...data.matchAll(itemre)]
        for (var i=0;i<items.length;i++){
            let itemraw=items[i]
            let item={
                Binded:itemraw[1]=="＊",
                Name:itemraw[2],
                ID:itemraw[5],
                Count:itemraw[7]?(itemraw[7]-0):1,
            }
            App.Core.Asset.Convert(item)
        }
    }
    App.Core.Asset.Convert=function(obj){
        let asset=new Asset()
        for (var i=0;i<App.Core.Asset.Valuings.length;i++){
            App.Core.Asset.Valuings[i].Value(obj,asset)
        }
        App.Data.AssetList.push(asset)
    }
    world.EnableTriggerGroup("core.asset.item",false)

    App.Core.Asset.Load=function(strategy){
        let v=new Valuation(strategy)
        v.Actions=App.Core.Asset.LoadActions(GetVariable("valuing"))
        switch(v.GetPreset()){
            case "auto":
                v.Actions=v.Actions.concat(autoActions)
                break
        }
        v.Load()
        App.Core.Valuation=v
        return v
    }
    App.Core.Asset.Check=function(strategy){
        v=App.Core.Asset.Load(strategy)
        if (App.Data.Load&&v.Weight){
            if (App.Data.Load>v.Weight){
                return true
            }
        }
        for (var i=0;i<App.Data.AssetList.length;i++){
            for (var k=0;k<v.Treasure;k++)
            if (App.Data.AssetList.Type[v.Treasure[k]]){
                return true
            }
        }
        return false
    }
    App.Core.Asset.RegisterValuing(new (Include("core/valuing/basic.js"))())
    App.Core.Asset.RegisterValuing(new (Include("core/valuing/pro.js"))())
    App.Core.Asset.RegisterValuing(new (Include("core/valuing/gem.js"))())
    App.Core.Asset.RegisterValuing(new (Include("core/valuing/random.js"))())
})(App)