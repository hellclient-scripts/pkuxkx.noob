(function (app) {
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
    let loadrooms=function(rooms) {
        rooms.forEach(function (data) {
            if (data==""){
                return
            }
            let info = data.split(sep)
            let options = {
                Desc: info[2],
            }
            switch (info[3]) {
                case "Landmark":
                    options.Landmark = info[4]
                    break
                case "Station":
                    options.Station = info[4]
                    break
            }
            addroom(info[0], info[1], options)
        });
    }
    var addroom = function (id, name, data) {
        app.Info.Rooms[id] = {
            ID: id,
            Name: name,
            Desc: data.Desc ? data.Desc : null
        }
        if (data.Landmark) {
            app.Info.Landmarks[data.Landmark] = id
        }
        if (data.Station) {
            app.Info.Stations[data.Station] = id
        }
    }
    app.API.ResetMapper=function(){
        loadrooms(app.Info.BuiltinRooms)
        loadrooms(app.Info.UserRooms)
        Mapper.reset()
        for (var key in app.Info.Rooms) {
            Mapper.clearroom(key)
        }
        loadpath(app.Info.BuiltinPaths)
        loadpath(app.Info.UserPaths)

    }
    app.RegisterCallback("info.mapper.reset", function () {
        app.API.ResetMapper()
    })
    app.Bind("Ready", "info.mapper.reset")

})(App)