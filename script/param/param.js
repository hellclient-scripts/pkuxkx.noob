(function(app){
    world.Note("加载系统参数");
    app.Params={
        "tick":"1000",
        "cmdlimit":"20",
    }
    app.InitParam=function(name,val){
        app.Params[name]=val
    }
    app.GetParam=function(name){
        var val=world.GetVariable("sys_"+name)
        if (val===""){
            val=app.Var[name]
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