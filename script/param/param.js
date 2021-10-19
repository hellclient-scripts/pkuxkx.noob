(function(app){
    world.Note("加载系统参数");
    app.Params={
        "tick":"550",
        "cmdlimit":"10",
        "cmdinterval":"50",
        "eatinterval":"10",
        "food":"gan liang",
        "food_min":"2",
        "drink":"niurou tang",
        "drink_min":"2",
        "walkstep":"8",
        "checkhpinterval":"1000",
        "checkscoreinterval":"30000",
        "checkjifainterval":"60000",
        "checkskillsinterval":"60000",
        "checkiteminterval":"10000",
        "charset":"2",
        "initcmd":"set area_detail 1;set breif 2;",
        "echo":"t",
    }
    app.InitParam=function(name,val){
        app.Params[name]=val
    }
    app.GetParam=function(name){
        var val=world.GetVariable("sys_"+name)
        if (val===""){
            val=app.Params[name]
            if (val===undefined){
                val= ""
            }
        }
        return val
    }
    app.GetNumberParam=function(name){
        var val=app.GetParam(name)
        if (!val){
            return 0
        }
        return val-0
    }
    app.GetBoolParam=function(name){
        var val=app.GetParam(name).toLowerCase()
        if (!val){
            return false
        }
        return val=="t"||val=="true"
    }
})(App)