(function (App) {
    let sep=/\|\|/
    let parsepath=function(fr,to,taglist,str,delay){
        let path = Mapper.newpath()
        path.from=fr
        path.to=to
        path.command=str
        path.delay = str.split(";").length+delay
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
            if (paths[key]==""||paths[key].slice(0,2)=="//"){
                continue
            }
            let data = paths[key].split(sep)
            let from = data[0]
            let to = data[1]
            let tags=data[2]
            let delay=0
            if (data.length>5){
                delay=data[5]-0
            }
            let topath = parsepath(from,to,tags,data[3],delay)
            if (topath){
                Mapper.addpath(from, topath)
            }
            if (data.length > 4 ) {
                let frompath = parsepath(to,from,tags,data[4],delay)
                if (frompath){
                    Mapper.addpath(to, frompath)
                }
            }
        }
    }
    let loadrooms=function(rooms) {
        rooms.forEach(function (data) {
            if (data==""||data.slice(0,2)=="//"){
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
                case "Tags":
                    options.Tags = info[4]
                    break
                case "Full":
                    options.Full=info[4]
                    break
                case "DescStart":
                    options.DescStart=info[4]
                    break       
            }
            addroom(info[0], info[1], options)
        });
    }
    var addroom = function (id, name, data) {
        App.Info.Rooms[id] = {
            ID: id,
            Name: name,
            Desc: data.Desc ? data.Desc : null
        }
        if (data.Landmark) {
            App.Info.Landmarks[data.Landmark] = id
        }
        if (data.Station) {
            App.Info.Stations[data.Station] = id
        }
        if (data.Tags) {
            App.Info.Tags[data.Tags] = id
        }
        if (data.Full) {
            App.Info.Full[data.Full] = id
        }
        if (data.DescStart){
            App.Info.DescStart[data.DescStart]=id
        }
    }
    App.API.ResetMapper=function(){
        loadrooms(App.Info.BuiltinRooms)
        loadrooms(App.Info.UserRooms)
        Mapper.reset()
        for (var key in App.Info.Rooms) {
            Mapper.clearroom(key)
        }
        loadpath(App.Info.BuiltinPaths)
        loadpath(App.Info.UserPaths)

    }
    App.RegisterCallback("info.mapper.reset", function () {
        App.API.ResetMapper()
    })
    App.Bind("Ready", "info.mapper.reset")

})(App)