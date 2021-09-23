(function (app) {
    app.Info.UserPaths=[]
    app.Info.BuiltinPaths=[]
    let pathre=/^(\[(.+)\]){0,1}(.*)$/
    let sep=/\|\|/
    let parsepath=function(fr,to,taglist,str){
        let path = Mapper.newpath()
        path.from=fr
        path.to=to
        path.command=str
        path.delay = str.split(";").length
        let pathtags=[]
        let pathexcludetags=[]
        if (taglist){
            let tags=taglist.split(",")

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
            let tags=data[2]
            let topath = parsepath(from,to,tags,data[3])
            if (topath){
                Mapper.addpath(from, topath)
            }
            if (data.length > 4 ) {
                let frompath = parsepath(to,from,tags,data[4])
                if (frompath){
                    Mapper.addpath(to, frompath)
                }
            }
        }
    }
    app.RegisterCallback("info.paths.loadpaths", function () {
        world.Note("加载路径")
        app.Info.BuiltinPaths= world.ReadLines("info/data/paths.txt")
        loadpath(app.Info.BuiltinPaths)
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