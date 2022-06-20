(function(App){
    world.Note("加载系统参数");
    App.Params={
        "tick":"550",
        "cmdlimit":"12",
        "cmdinterval":"50",
        "eatinterval":"10",
        "food":"gan liang",
        "food_min":"2",
        "food_max":"10",
        "drink":"niurou tang",
        "drink_min":"2",
        "drink_max":"10",
        "gold_min":"4",
        "gold_withdraw":"1",
        "bank_location":"yzqz",
        "walkstep":"8",
        "checkhpinterval":"1000",
        "checkscoreinterval":"30000",
        "checkjifainterval":"60000",
        "checkskillsinterval":"60000",
        "checkiteminterval":"10000",
        "checkavatarinterval":"60000",
        "charset":"2",
        "echo":"t",
        "questsdelay":"1",
        "queuedelay":"1",
        "sleepdelay":"10500",
    }
    App.InitParam=function(name,val){
        App.Params[name]=val
    }
    App.GetParam=function(name){
        var val=world.GetVariable(name)
        if (val===""){
            val=App.Params[name]
            if (val===undefined){
                val= ""
            }
        }
        return val
    }
    App.GetNumberParam=function(name){
        var val=App.GetParam(name)
        if (!val){
            return 0
        }
        return val-0
    }
    App.GetBoolParam=function(name){
        var val=App.GetParam(name).toLowerCase()
        if (!val){
            return false
        }
        return val=="t"||val=="true"
    }
})(App)