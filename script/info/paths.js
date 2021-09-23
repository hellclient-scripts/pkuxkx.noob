(function (app) {
    app.Info.UserPaths=[]
    app.Info.BuiltinPaths=[]

  
    app.RegisterCallback("info.paths.loadpaths", function () {
        app.Info.BuiltinPaths= world.ReadLines("info/data/paths.txt")
        if (world.HasHomeFile("data/paths.txt")){
            app.Info.UserPaths=world.ReadHomeLines("data/paths.txt")
        }
    })
    app.API.SaveUserPaths=function(){
        let data=app.Info.UserPaths.join("\n")
        world.WriteHomeFile("data/paths.txt",data)
    }
    app.RegisterAPI("GetPath", function (fr, tolist) {
        app.Raise("PathInit")
        var data = Mapper.getpath(fr, 1, tolist)
        if (!data) {
            return null
        }
        let path = new app.Path()
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
    app.Bind("Ready", "info.paths.loadpaths")
})(App)