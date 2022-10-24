(function(App){
    App.Core.Weapon={}
    let check = Include("core/check/check.js")
    let weaponsre=/[,\n]/
    App.Core.Weapon.ReWield=function(){
        App.Send("unwield all")
        App.Core.Weapon.Wield()
    }
    App.Core.Weapon.Wield=function(){
        let data=world.GetVariable("wield").trim().split("\n")
        let result=[]
        let defaultresult=[]
        for(var i=0;i<data.length;i++){
            let line=data[i]
            if (line){
                let cmd=SplitN(line,":",2)
                if (cmd.length==1){
                    defaultresult.push(line)
                }else{
                    if (cmd[0]==""){
                        defaultresult.push(cmd[1])
                    }else if(App.Core.Combat.Current!=null && cmd[0]==App.Core.Combat.Current.Strategy){
                        result.push(cmd[1])
                    }
                }
            }
        }
        if (result.length==0){
            result=defaultresult
        }
        for(var i=0;i<result.length;i++){
            App.Send(result[i])
        }
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