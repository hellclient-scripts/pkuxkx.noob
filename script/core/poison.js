(function(App){
    App.Core.Poison={}
    App.Core.Poison.Poisons={
        "苗疆瘴气":"wait",
        "蛇毒":"wait",
        "星宿毒掌毒":"wait",
        "冰魄寒毒":"wait",
    }
    App.Core.Poison.Cure=function(){
        let type=App.Core.Poison.Poisons[App.Core.Poison.GetCurrent()]
        switch (type){
            case "wait":
                App.Core.Poison.CureWait()
                break
            case "":
                App.Next()
                break
        }
    }
    App.Core.Poison.GetCurrent=function(){
        for(var i in App.Core.Poison.Poisons){
            if (App.Data.HP.status[i]){
                return i
            }
        }
        return ""
    }
    App.Core.Poison.CureWait=function(){
        var commands=[]
        if (App.Core.PerQixue()<App.GetNumberParam("heal_below")){
            commands.push(App.NewCommand("do","yun heal"))
        }else if (App.Core.PerJing()<App.GetNumberParam("heal_below")){
            commands.push(App.NewCommand("do","yun inspire"))
        }else{
            commands.push(App.NewCommand("do","dazuo "+App.GetNumberParam("poison_dazuo_num")))
        }
        commands.push(App.NewCommand("nobusy"))
        App.Commands(commands).Push()
        App.Next()
    }
    

// 你向平一指打听有关『cure』的消息。
// 平一指伸出右手，搭在你手腕上。
// 过了片刻，平一指缓缓对你说道：各项明细如下，
// 星宿毒掌之毒：二两黄金。
// 平一指说道：共需诊金2两黄金。
})(App)