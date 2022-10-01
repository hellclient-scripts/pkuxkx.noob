(function (App) {
    App.Info.BuiltinRooms=[]
    App.Info.UserRooms=[]
    App.Info.Rooms = {}
    App.Info.SleepRooms=[]
    App.Info.Stations = {}
    App.Info.Landmarks = {}
    App.Info.DescStart={}
    App.Info.DescFirst={}
    App.Info.Desc={}
    App.Info.Tags={}
    App.Info.Full={}
    App.Info.LocateExits={
        "树枝上":["climb down"],
        "树干上":["climb down"],
        "树顶":["climb down"]
    }
    App.Info.DefaultHomeLocation="yz-sczh"
    App.Info.LoadSleepRooms=function(){
        App.Info.SleepRooms=[]
        let lines=world.ReadLines("info/data/sleeprooms.txt")
        lines.forEach(function(line){
            if (line==""||line.slice(0,2)=="//"){
                return
            }
            App.Info.SleepRooms.push(line)
        })
    }
    App.Info.RoomHome="home"
    App.Info.RoomSafe="ssb-xxs"
    App.Info.RoomSell="yzdp"
    App.RegisterCallback("info.room.objlocate", function (data) {
        if (!App.Data.Room.ID && App.Info.Landmarks[data.ID]) {
            App.Data.Room.ID = App.Info.Landmarks[data.ID]
            world.Note("定位成功，位于 " + App.Info.Rooms[App.Data.Room.ID].Name + "(" + App.Data.Room.ID + ")")
        }
    })
    
    App.Info.RoomFull=function(){
        if (!App.Data.Room.Exits){
            return ""
        }
        return App.Data.Room.Name+App.Data.Room.Tags.trim()+App.Data.Room.Exits.join(",")
    }
    App.RoomFull=function(){
        Note(App.Info.RoomFull())
    }
    let re=/[\n\s\t]/g
    App.Info.RoomDesc=function(){
        let desc=App.Core.RoomDesc.Desc
        return desc.replace(re, "")
    }
    App.RoomDesc=function(){
        Note(App.Info.RoomDesc())
    }
    App.Info.RoomDescFirst=function(){
        return App.Info.RoomDesc().split("。",1)[0]
    }
    App.RoomDescFirst=function(){
        Note(App.Info.App.Info.RoomDescFirst())
    }
    App.Info.RoomDescStart=function(){
        return App.Info.RoomDesc().slice(0,50)
    }
    App.RoomDescStart=function(){
        Note(App.Info.RoomDescStart())
    }
    App.RegisterCallback("info.room.idlocate", function () {
        var id = App.Info.Stations[App.Data.Room.Name]||App.Info.Tags[App.Data.Room.Tags]||App.Info.Full[App.Info.RoomFull()]
        if (!id){
            let descstart=App.Info.RoomDescStart()
            if (descstart){
                id=App.Info.DescStart[descstart]
            }    
        }
        if (!id){
            let desc=App.Info.RoomDesc()
            if (desc){
                id=App.Info.Desc[desc]
            }    
        }
        if (!id){
            let desc=App.Info.RoomDescFirst()
            if (desc){
                id=App.Info.DescFirst[desc]
            }    
        }
        
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
        App.Info.BuiltinRooms = App.Info.BuiltinRooms.concat(world.ReadLines("info/data/rooms.txt"))
        if (world.HasHomeFile("data/rooms.txt")){
            App.Info.UserRooms=world.ReadHomeLines("data/rooms.txt")
        }
        App.Info.LoadSleepRooms()
    })
    App.RegisterAPI("SaveUserRooms",function(){
        let data=App.Info.UserRooms.join("\n")
        MakeHomeFolder("data/")
        world.WriteHomeFile("data/rooms.txt",data)
    })
    App.Bind("Ready", "info.rooms.loadrooms")
})(App)