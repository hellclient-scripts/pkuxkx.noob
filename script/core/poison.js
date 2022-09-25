(function(App){
    App.Core.Poison={}
    App.Core.Poison.Poisons={
        "苗疆瘴气":"wait",
        "蛇毒":"wait",
        "星宿毒掌毒":"wait",
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
})(App)