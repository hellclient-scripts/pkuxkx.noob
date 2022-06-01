(function(App){
    App.CheckLevelBrief=0
    App.CheckLevelFull=10
    App.Check=function(level){
        App.Raise("Check",{Level:level?level:0,ID:""})
    }
    App.ForceCheck=function(id){
        if (!id){
            throw "ForceCheck的id不可为空"
        }
        App.Raise("Check",{Level:0,ID:id})

    }
})(App)