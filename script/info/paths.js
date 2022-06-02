(function (App) {
    App.Info.UserPaths=[]
    App.Info.BuiltinPaths=[]

  
    App.RegisterCallback("info.paths.loadpaths", function () {
        App.Info.BuiltinPaths= world.ReadLines("info/data/paths.txt")
        if (world.HasHomeFile("data/paths.txt")){
            App.Info.UserPaths=world.ReadHomeLines("data/paths.txt")
        }
    })
    App.RegisterAPI("SaveUserPaths",function(){
        let data=App.Info.UserPaths.join("\n")
        world.WriteHomeFile("data/paths.txt",data)
    })
    App.RegisterAPI("GetPath", function (fr, tolist) {
        App.Raise("PathInit")
        var data = Mapper.getpath(fr, 1, tolist)
        if (!data) {
            return null
        }
        let path = new App.Path()
        let commands = []
        var result = {
            Delay: 0,
            Path: path,
            Command: ""
        }
        data.forEach(function (step) {
            path.PushCommands(step.command.split(";"), step.to)
            result.Delay = result.Delay + (step.delay ? step.delay : 1)
            commands.push(step.command)
        })
        result.Command = commands.join(";")
        return result
    })
    App.Bind("Init", "info.paths.loadpaths")
})(App)