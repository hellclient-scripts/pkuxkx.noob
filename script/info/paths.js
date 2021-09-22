(function (app) {
    app.Info.UserPaths=[]
    let pathre=/^(\[(.+)\]){0,1}(.*)$/
    let sep=/\|\|/
    let parsepath=function(fr,to,str){
        let result=str.match(pathre)
        if (result==null){
            world.Note("无效的路径"+str)
            return null
        }
        let path = Mapper.newpath()
        path.from=fr
        path.to=to
        path.command=result[3]
        path.delay = result[3].split(";").length
        let pathtags=[]
        let pathexcludetags=[]
        if (result[2]){
            let tags=result[2].split(",")

                tags.forEach(function(tag){

                    if (tag.length>0){

                        if (tag[0]=="!"){
                            if (tag.length>1){
                                pathexcludetags.push(tag.substr(1))
                            }
                            return
                        }
                        pathtags.push(tag)
                    }
                })
        }
        path.tags=pathtags
        path.excludetags=pathexcludetags
        return path
    }
    let loadpath=function (paths){
        for (var key in paths) {
            let data = paths[key].split(sep)
            let from = data[0]
            let to = data[1]
            let topath = parsepath(from,to,data[2])
            if (topath){
                Mapper.addpath(from, topath)
            }
            if (data.length > 3 ) {
                let frompath = parsepath(to,from,data[3])
                if (frompath){
                    Mapper.addpath(to, frompath)
                }
            }
        }
    }
    app.RegisterCallback("info.paths.loadpaths", function () {
        world.Note("加载路径")
        Mapper.reset()
        for (var key in app.Info.Rooms) {
            Mapper.clearroom(key)
        }
        let paths= world.ReadLines("info/data/paths.txt")
        loadpath(paths)
        if (world.HasHomeFile("data/paths.txt")){
            app.Info.UserPaths=world.ReadHomeLines("data/paths.txt")
            loadpath(app.Info.UserPaths)
        }

    })
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