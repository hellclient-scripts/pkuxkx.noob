(function(app){
    app.Data.Items=[]
    app.Data.Equipments=[]
    app.Data.Load=0
    app.Data.Weapon=""
    app.Data.WeaponID=""
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
})(App)