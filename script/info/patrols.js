(function (App) {
    App.Info.UserPatrols=[]
    App.Info.BuiltinPatrols=[]
    App.Info.Patrols={}
    var loadline=function(line){

    }
    App.Info.ReloadPatrols=function(){
        App.Info.Patrols={}
        App.Info.BuiltinPatrols.forEach(function(line){
            loadline(line)
        });
        App.Info.UserPatrols.forEach(function(line){
            loadline(line)
        });
    }
    App.RegisterCallback("info.patrols.loadpatrols", function () {
        App.Info.BuiltinPatrols= world.ReadLines("info/data/patrols.txt")
        if (world.HasHomeFile("data/patrols.txt")){
            App.Info.UserPatrols=world.ReadHomeLines("data/patrols.txt")
        }
    })
    App.RegisterAPI("SaveUserPatrols",function(){
        let data=App.Info.UserPatrols.join("\n")
        world.WriteHomeFile("data/patrols.txt",data)
    })
    App.RegisterAPI("GetPatrol", function (name) {
    })
    App.Bind("Init", "info.patrols.loadpatrols")
})(App)