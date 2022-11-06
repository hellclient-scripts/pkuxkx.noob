(function(App){
    let Action = Include("include/action.js")
    let Assessment = Include("include/assessment.js")

    App.Core.Assess={}
    App.Core.Assess.LoadActions=function(data){
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
    App.Core.Assess.Assessors=[]
    App.Core.Assess.RegisterAssessor=function(assessor){
        App.Core.Assess.Assessors.push(assessor)
    }
    
    let autoactions=[
        "#dang type=set",
        "#dang id=pro book",
        "hole 1,quality 4>#dang type=zhiye",
        "!hole 2>#sell type=random",
        "!hole 2>#sell type=zhiye",
        "#sell.5 xue jiedan",
        "quit:#sell xue jiedan",
        "relogin:#sell xue jiedan",
        "#pack type=gem",
        "#sell nen cao,sui rouxie",
        "quit:#sell wushi dao,dulong bian",
        "#drop shi tan,xuan bing,"
    ].join("\n")
    App.Core.Assess.CurrentType=""
    App.Core.Assess.Tasks=[]
    App.Core.Assess.OnItemStart=function(name, output, wildcards){
        switch(wildcards[0]){
            case "装  备":
                App.Core.Assess.Tasks=[]
                App.Core.Assess.CurrentType=""
                world.EnableTriggerGroup("core.assess.item",false)
                break
            case "财  宝":
                App.Core.Assess.CurrentType="treasure"
                world.EnableTriggerGroup("core.assess.item",true)
                break
            case "其  它":
                App.Core.Assess.CurrentType="item"
                world.EnableTriggerGroup("core.assess.item",true)
                break 
            default:
                App.Core.Assess.CurrentType=""
                world.EnableTriggerGroup("core.assess.item",false)
                break
        }
    }
    let itemsre=/^│(\s*＊{0,1}[^()×＋]+＋{0,1}(\([^()]+\)){0,1}(×\d+){0,1}\s+)*│$/
    let itemre=/(＊{0,1})([^ ()×＋]+)(＋{0,1})(\(([^()]+)\)){0,1}(×(\d+)){0,1}/g
    App.Core.Assess.OnItem=function(name, output, wildcards){
        let result=output.match(itemsre)
        if (result==null){
            world.EnableTriggerGroup("core.assess.item",false)
            return
        }
        let data=output.slice(1,-1)
        let items=[...data.matchAll(itemre)]
        for (var i=0;i<items.length;i++){
            let itemraw=items[i]
            let item={
                Binded:itemraw[1]=="＊",
                Name:itemraw[2],
                More:itemraw[3]=="＋",
                ID:itemraw[5],
                Count:itemraw[7]?(itemraw[7]-0):1,
            }
            App.Core.Assess.Filter(item)
        }
    }
    App.Core.Assess.Filter=function(obj){
        let assessment=new Assessment()
        for (var i=0;i<App.Core.Assess.Assessors.length;i++){
            App.Core.Assess.Assessors[i].Assess(obj,assessment)
        }
        // Dump(assessment)
    }
    world.EnableTriggerGroup("core.assess.item",false)



    App.Core.Assess.RegisterAssessor(new (Include("core/assessor/basic.js"))())
    App.Core.Assess.RegisterAssessor(new (Include("core/assessor/pro.js"))())

})(App)