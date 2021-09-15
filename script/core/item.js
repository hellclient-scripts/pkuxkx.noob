(function(app){
    let check=Include("core/check/check.js")
    app.Data.Items=[]
    app.Data.LastItem=[]
    app.Data.Equipments=[]
    app.Data.Load=0
    app.Data.Weapon=""
    app.Data.WeaponID=""
    app.Bind("Check","core.item.item")
    let checkItem=(new check("item")).WithLevel(app.CheckLevelBrief).WithCommand("i2").WithIntervalParam("checkiteminterval").WithLastID("LastItem")
    app.RegisterCallback("core.item.item",checkItem.Callback())
    app.Core.OnItem=function(name, output, wildcards){
        app.Data.Items=[]
        app.Data.Equipments=[]
        app.Data.Load=wildcards[1]-0
        app.Data.Weapon=""
        app.Data.WeaponID=""
        world.EnableTriggerGroup("item",true)
    }
    app.Core.OnItemObj=function(name, output, wildcards){
        app.Data.Items.push({ID:wildcards[1],Name:wildcards[0]})
    }
    app.Core.OnItemObjEnd=function(name, output, wildcards){
        world.EnableTrigger("itemobj",false)
        world.EnableTrigger("itemobjend",false)
        world.EnableTriggerGroup("itemweapon",true)
    }
    app.Core.OnItemWeapon=function(name, output, wildcards){
        app.Data.Weapon=wildcards[0]
        app.Data.WeaponID=wildcards[1]
        world.EnableTriggerGroup("itemweapon",false)
    }
    app.Core.OnItemNoWeapon=function(name, output, wildcards){
        world.EnableTriggerGroup("itemweapon",false)
    }
    app.Core.OnItemEquipment=function(name, output, wildcards){
        world.EnableTriggerGroup("equipment",true)
    }
    app.Core.OnItemEquipmentObj=function(name, output, wildcards){
        app.Data.Equipments.push({ID:wildcards[1],Name:wildcards[0]})
    }
    app.Core.OnItemEquipmentObjEnd=function(name, output, wildcards){
        world.EnableTriggerGroup("equipment",false)
    }
    app.RegisterCallback("core.item.inittags",function(){
        let goldname =app.GetItemObj("Gold")
        let gold=0
        let silvername =app.GetItemObj("Silver")
        let silver=0
        if (goldname){
            gold=CNumber.Split(goldname).Count
        }
        if (silvername){
            silver=CNumber.Split(silvername).Count
        }
        Mapper.settag("rich",gold*100+silver>10)
    })
    app.Bind("PathInit","core.item.inittags")
    app.GetItemObj=function(id,lowercase){
        if (lowercase){
            id=id.toLowerCase()
        }
        for (var key in app.Data.Items){
            let itemid= app.Data.Items[key].ID
            if (lowercase){
                itemid=itemid.toLowerCase()
            }
            if (itemid==id){
                return app.Data.Items[key].Name
            }
        }
        return null
    }
})(App)