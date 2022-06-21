(function (App) {
    App.Info.UserPatrols=[]
    App.Info.BuiltinPatrols=[]
    App.Info.Patrols={}
    App.Info.PatrolsList=[]

    var loadline=function(line){
        if (line==""||line.slice(0,2)=="//"){
            return
        }
        var data=SplitN(line,"||",2)
        if (data.length==0){
            return
        }
        App.Info.Patrols[data[0]]=line
        App.Info.PatrolsList.push(line)
    }
    App.Info.ReloadPatrols=function(){
        App.Info.Patrols={}
        App.Info.PatrolsList=[]
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
        MakeHomeFolder("data/")
        world.WriteHomeFile("data/patrols.txt",data)
    })
    App.Bind("Init", "info.patrols.loadpatrols")
    App.RegisterCallback("info.patrols.reloadpatrols",App.Info.ReloadPatrols)
    App.Bind("Ready", "info.patrols.reloadpatrols")

})(App)