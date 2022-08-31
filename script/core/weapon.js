(function(App){
    App.Core.Weapon={}
    let check = Include("core/check/check.js")
    let weaponsre=/[,\n]/
    App.Core.Weapon.ReWield=function(){
        App.Send("unwield all")
        App.Core.Weapon.Wield()
    }
    App.Core.Weapon.Wield=function(){
        let weapons=world.GetVariable("weapons").trim()
        weapons.split(weaponsre).forEach(function(weapon){
            weapon=weapon.trim()
            if (weapon){
                App.Send("wield "+weapon+" at right")
            }
        })
        weapons=world.GetVariable("weapons_left").trim()
        weapons.split(weaponsre).forEach(function(weapon){
            weapon=weapon.trim()
            if (weapon){
                App.Send("wield "+weapon+" at left")
            }
        })

    }
    App.Core.Weapon.ToRepair=""
    App.Core.Weapon.LastDurability=0
    App.Core.Weapon.LastDurabilityMax=0
    App.Core.Weapon.OnDurability=function(name, output, wildcards){
        App.Core.Weapon.LastDurability=wildcards[0]-0
        App.Core.Weapon.LastDurabilityMax=wildcards[1]-0
    }
    App.RegisterCallback("core.weapon.durabilityend",function(data){
        if (App.Core.Weapon.LastDurabilityMax>0&&App.Core.Weapon.LastDurability<App.GetNumberParam("repair_below")){
            App.Core.Weapon.ToRepair=data
        }
    })
    App.Core.Weapon.Check=function(id){
        App.Core.Weapon.LastDurability=0
        App.Core.Weapon.LastDurabilityMax=0
        App.Send("l "+id)
        App.Response("wepon","durability",id)
    }
    App.Core.Weapon.CheckRandom=function(){
        let repair_list=GetVariable("repair_list").trim()
        if (repair_list){
            let list=repair_list.split("\n")
            App.Core.Weapon.Check(RandomList(list))
        }
    }
    App.Bind("Response.wepon.durability","core.weapon.durabilityend")
    App.Core.Weapon.Repair=function(){
        if (App.Core.Weapon.ToRepair!=""){
            App.Commands([
                App.NewCommand("to",App.Options.NewWalk("yz-fds")),
                App.NewCommand("do","fix "+App.Core.Weapon.ToRepair),
                App.NewCommand("nobusy"),
                App.NewCommand("function",function(){
                    App.Core.Weapon.ToRepair=""
                    App.Next()
                })
            ]).Push()         
        }
        App.Next()
    }
    App.Bind("Check", "core.weapon.durability")
    let checkDurability = (new check("durability")).WithLevel(App.CheckLevelFull).WithCommand(App.Core.Weapon.CheckRandom).WithIntervalParam("checkdurabilityinterval").WithLastID("LastDurability")
    App.RegisterCallback("core.weapon.durability", checkDurability.Callback())

}(App))