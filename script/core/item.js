(function(App){
    let check=Include("core/check/check.js")
    App.Data.Items=[]
    App.Data.LastItem=[]
    App.Data.Equipments=[]
    App.Data.LupiDai=[]
    App.Data.Load=0
    App.Data.Weapon=""
    App.Data.WeaponID=""
    App.Data.ItemList={}
    App.Data.ItemList.ID=""
    App.Data.ItemList.Items=[]
    App.Bind("Check","core.item.item")
    let checkItem=(new check("item")).WithLevel(App.CheckLevelBrief).WithCommand("i2;l lupi dai").WithIntervalParam("checkiteminterval").WithLastID("LastItem")
    App.RegisterCallback("core.item.item",checkItem.Callback())
    App.Core.OnItem=function(name, output, wildcards){
        App.Data.Items=[]
        App.Data.Equipments=[]
        App.Data.Load=wildcards[1]-0
        App.Data.Weapon=""
        App.Data.WeaponID=""
        world.EnableTriggerGroup("item",true)
    }
    App.Core.OnItemObj=function(name, output, wildcards){
        let item={ID:wildcards[1],Name:wildcards[0]}
        if (item.Name.startsWith("(被卸)")){
            item.Name=item.Name.slice(4)
        }
        App.Data.Items.push(item)
    }
    App.Core.OnItemObjEnd=function(name, output, wildcards){
        world.EnableTrigger("itemobj",false)
        world.EnableTrigger("itemobjend",false)
        world.EnableTriggerGroup("itemweapon",true)
    }
    App.Core.OnItemWeapon=function(name, output, wildcards){
        App.Data.Weapon=wildcards[0]
        App.Data.WeaponID=wildcards[1]
        world.EnableTriggerGroup("itemweapon",false)
    }
    App.Core.OnItemNoWeapon=function(name, output, wildcards){
        world.EnableTriggerGroup("itemweapon",false)
    }
    App.Core.OnItemEquipment=function(name, output, wildcards){
        world.EnableTriggerGroup("equipment",true)
    }
    App.Core.OnItemEquipmentObj=function(name, output, wildcards){
        App.Data.Equipments.push({ID:wildcards[1],Name:wildcards[0]})
    }
    App.Core.OnItemEquipmentObjEnd=function(name, output, wildcards){
        world.EnableTriggerGroup("equipment",false)
    }

    world.EnableTriggerGroup("lupidai",false)
    App.GetCash=function(){
        let cashobj=App.GetItemObj("Thousand-cash")
        let cash=0
        let goldobj =App.GetItemObj("Gold")
        let gold=0
        if (cashobj){
            cash=CNumber.Split(cashobj.Name).Count
        }
        if (goldobj){
            gold=CNumber.Split(goldobj.Name).Count
        }
        return cash*10+gold
    }
    App.GetEquipmentObj=function(id,lowercase){
        if (lowercase){
            id=id.toLowerCase()
        }
        for (var key in App.Data.Equipments){
            let itemid= App.Data.Equipments[key].ID
            if (lowercase){
                itemid=itemid.toLowerCase()
            }
            if (itemid==id){
                return App.Data.Equipments[key]
            }
        }
        return null
    }
    
    App.GetItemObj=function(id,lowercase){
        if (lowercase){
            id=id.toLowerCase()
        }
        for (var key in App.Data.Items){
            let itemid= App.Data.Items[key].ID
            if (lowercase){
                itemid=itemid.toLowerCase()
            }
            if (itemid==id){
                return App.Data.Items[key]
            }
        }
        return null
    }
    App.GetItemByName=function(name,convert){
        for (var key in App.Data.Items){
            let itemname= App.Data.Items[key].Name
            if (convert){
                let i=CNumber.Split(itemname)
                itemname=i.Item
                App.Data.Items[key].Count=i.Count==0?1:i.Count
            }
            if (name==itemname){
                return App.Data.Items[key]
            }
        }
        return null
    }
    App.HasAnyItemObj=function(idlist,lowercase){
        for (var index in idlist){
            var item=App.GetItemObj(idlist[index],lowercase)
            if (item){
                return item.Name
            }
        }
        return false
    }
    App.GetItemNumber=function(id,lowercase){
        let label=App.GetItemObj(id,lowercase)
        if (!label){
            return 0
        }
        return CNumber.Split(label.Name).Count
    }


    App.Core.OnLupiDaiStart=function(name, output, wildcards){
        App.Data.LupiDai=[]
        world.EnableTriggerGroup("lupidai",true)
    }
    App.Core.OnLupiDaiItem=function(name, output, wildcards){
        App.Data.LupiDai.push({ID:wildcards[1],Name:wildcards[0]})
        world.EnableTriggerGroup("lupidai",true)
    }
    App.Core.OnLupiDaiEnd=function(name, output, wildcards){
        world.EnableTriggerGroup("lupidai",false)
    }
    App.GetLupiDaiItemByName=function(name,convert){
        for (var key in App.Data.LupiDai){
            let itemname= App.Data.LupiDai[key].Name
            if (convert){
                let i=CNumber.Split(itemname)
                itemname=i.Item
                App.Data.LupiDai[key].Count=i.Count==0?1:i.Count
            }
            if (name==itemname){
                return App.Data.LupiDai[key]
            }
        }
        return null
    }
    App.GetLupiDaiItemObj=function(id,lowercase){
        if (lowercase){
            id=id.toLowerCase()
        }
        for (var key in App.Data.LupiDai){
            let itemid= App.Data.LupiDai[key].ID
            if (lowercase){
                itemid=itemid.toLowerCase()
            }
            if (itemid==id){
                return App.Data.LupiDai[key]
            }
        }
        return null
    }
    let itemlistre=/^\(\s*(\d+)\)\s*(\(绑\)){0,1}\s*(\(装\)){0,1}\s*([^()]+)\(([^()]+)\)(.*)$/
    App.GetLupiDaiItemNumber=function(id,lowercase){
        let item=App.GetLupiDaiItemObj(id,lowercase)
        if (!item){
            return 0
        }
        return item.Count
    }
    App.Core.ItemList={}
    App.Core.ItemList.OnNoItemList=function(name, output, wildcards){
        App.Data.ItemList.ID=wildcards[0]
        App.Data.ItemList.Items=[]
    
    }
    App.Core.ItemList.OnItemList=function(name, output, wildcards){
        App.Data.ItemList.ID=wildcards[0]
        App.Data.ItemList.Items=[]
        world.EnableTriggerGroup("itemlist",true)
    }
    App.Core.ItemList.OnItemListItem=function(name, output, wildcards){
        let result=output.match(itemlistre)
        if (result){
            let item={
                Index:result[1]-0,
                Binded:result[2]!=null,
                Equipped:result[3]!=null,
                Label:result[4],
                ID:result[5],
                Detail:result[6],
            }
            App.Data.ItemList.Items.push(item)
        }else{
            world.EnableTriggerGroup("itemlist",false)        
        }
    }
    world.EnableTriggerGroup("itemlist",false)
    App.Core.ItemList.Filter=function(name,filter){
        App.Commands([
            App.NewCommand("do","i "+name),
            App.NewCommand("nobusy"),
            App.NewCommand("function",function(){
                for(var i=App.Data.ItemList.Items.length-1;i>-1;i--){
                    filter(App.Data.ItemList.Items[i])
                }
                App.Next()
            }),
        ]).Push()
        App.Next()
    }
    App.PackGem=function(cmd){
        if (!cmd){
            cmd="pack gem"
        }
        App.Core.ItemList.Filter("gem",function(item){
            App.Send(cmd)
        })
    }
})(App)