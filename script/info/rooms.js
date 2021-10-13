(function (app) {
    app.Info.BuiltinRooms=[]
    app.Info.UserRooms=[]
    app.Info.Rooms = {}
    app.Info.Stations = {}
    app.Info.Landmarks = {}
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
        world.Note("加载路径")
        app.Info.BuiltinRooms = world.ReadLines("info/data/rooms.txt")
        if (world.HasHomeFile("data/rooms.txt")){
            app.Info.UserRooms=world.ReadHomeLines("data/rooms.txt")
        }
    })
    app.RegisterAPI("SaveUserRooms",function(){
        let data=app.Info.UserRooms.join("\n")
        world.WriteHomeFile("data/rooms.txt",data)
    })
    app.Bind("Ready", "info.rooms.loadrooms")
})(App)