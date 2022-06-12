(function (App) {
    App.Info.BuiltinRooms=[]
    App.Info.UserRooms=[]
    App.Info.Rooms = {}
    App.Info.Stations = {}
    App.Info.Landmarks = {}
    App.Info.Tags={}
    App.Info.Full={}
    App.Info.RoomHome="home"
    App.Info.RoomSafe="yz-kd2f"
    App.RegisterCallback("info.room.objlocate", function (data) {
        if (!App.Data.Room.ID && App.Info.Landmarks[data.ID]) {
            App.Data.Room.ID = App.Info.Landmarks[data.ID]
            world.Note("定位成功，位于 " + App.Info.Rooms[App.Data.Room.ID].Name + "(" + App.Data.Room.ID + ")")
        }
    })
    App.Info.RoomFull=function(){
        return App.Data.Room.Name+App.Data.Room.Tags+App.Data.Room.Exits.join(",")
    }
    App.RegisterCallback("info.room.idlocate", function () {
        var id = App.Info.Stations[App.Data.Room.Name]||App.Info.Tags[App.Data.Room.Tags]||App.Info.Full[App.Info.RoomFull()]
        if (id) {
            App.Data.Room.ID = id
            world.Note("定位成功，位于 " + App.Info.Rooms[App.Data.Room.ID].Name + "(" + App.Data.Room.ID + ")")
            return
        }
    })
    App.Bind("OnRoomObj", "info.room.objlocate")
    App.Bind("OnRoomExits", "info.room.idlocate")

    App.RegisterCallback("info.rooms.loadrooms", function () {
        world.Note("加载房间")
        App.Info.BuiltinRooms = world.ReadLines("info/data/rooms.txt")
        if (world.HasHomeFile("data/rooms.txt")){
            App.Info.UserRooms=world.ReadHomeLines("data/rooms.txt")
        }
    })
    App.RegisterAPI("SaveUserRooms",function(){
        let data=App.Info.UserRooms.join("\n")
        MakeHomeFolder("data/")
        world.WriteHomeFile("data/rooms.txt",data)
    })
    App.Bind("Ready", "info.rooms.loadrooms")
})(App)