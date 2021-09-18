(function (app) {
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
    app.RegisterCallback("info.rooms.loadrooms", function () {
        let rooms = world.ReadLines("info/data/rooms.txt")
        rooms.forEach(function (data) {
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
    })
    app.Bind("Ready", "info.rooms.loadrooms")
})(App)