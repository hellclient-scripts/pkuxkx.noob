(function (app) {
    app.Info.BuiltinRooms=[]
    app.Info.UserRooms=[]
    app.Info.Rooms = {}
    app.Info.Stations = {}
    app.Info.Landmarks = {}
    let sep = /\|\|/

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

    app.RegisterCallback("info.room.objlocate", function (data) {
        if (!app.Data.Room.ID && app.Info.Landmarks[data.ID]) {
            app.Data.Room.ID = app.Info.Landmarks[data.ID]
            world.Note("定位成功，位于 " + app.Info.Rooms[app.Data.Room.ID].Name + "(" + app.Data.Room.ID + ")")
        }
    })
    app.RegisterCallback("info.room.idlocate", function () {
        var id = app.Info.Stations[app.Data.Room.Name]
        if (id) {
            app.Data.Room.ID = id
            world.Note("定位成功，位于 " + app.Info.Rooms[app.Data.Room.ID].Name + "(" + app.Data.Room.ID + ")")
        }
    })
    app.Bind("OnRoomObj", "info.room.objlocate")
    app.Bind("OnRoomExits", "info.room.idlocate")
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
    app.RegisterCallback("info.rooms.loadrooms", function () {
        app.Info.BuiltinRooms = world.ReadLines("info/data/rooms.txt")
        Mapper.reset()
        for (var key in app.Info.Rooms) {
            Mapper.clearroom(key)
        }
        loadrooms(app.Info.BuiltinRooms)
        if (world.HasHomeFile("data/rooms.txt")){
            app.Info.UserRooms=world.ReadHomeLines("data/rooms.txt")
            loadrooms(app.Info.UserRooms)
        }
    })
    app.SaveUserRooms=function(){
        let data=app.Info.UserRooms.join("\n")
        world.WriteHomeFile("data/rooms.txt",data)
    }
    app.Bind("Ready", "info.rooms.loadrooms")
})(App)