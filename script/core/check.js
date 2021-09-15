(function(app){
    app.CheckLevelBrief=0
    app.CheckLevelFull=10
    app.Check=function(level){
        app.Raise("Check",{Level:level?level:0,ID:""})
    }
    app.ForceCheck=function(id){
        if (!id){
            throw "ForceCheck的id不可为空"
        }
        app.Raise("Check",{Level:0,ID:id})

    }
})(App)