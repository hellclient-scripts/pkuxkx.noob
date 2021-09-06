(function(app){
    app.Info.Rooms={}
    app.Info.Stations={}
    app.Info.Landmarks={}

    var addroom=function(name,desc,data){
        app.Info.Rooms[name]=desc
        if (data.Landmark){
            app.Info.Landmarks[data.Landmark]=name
        }
        if (data.Station){
            app.Info.Stations[data.Station]=name
        }
    }
    
    app.RegisterCallback("info.room.objlocate",function(data){
        if (!app.Data.Room.ID && app.Info.Landmarks[data.ID]){
            app.Data.Room.ID=app.Info.Landmarks[data.ID]
            world.Note("定位成功，位于 "+app.Info.Rooms[app.Data.Room.ID]+"("+app.Data.Room.ID+")")
        }
    })
    app.RegisterCallback("info.room.namelocate",function(){
        var id=app.Info.Stations[app.Data.Room.Name]
        if (id){
            app.Data.Room.ID=id
            world.Note("定位成功，位于 "+app.Info.Rooms[app.Data.Room.ID]+"("+app.Data.Room.ID+")")
        }
    })
    app.Bind("OnRoomObj","info.room.objlocate")
    app.Bind("OnRoomExits","info.room.namelocate")

    addroom("yzgc","扬州广场",{Landmark:"Rong shu"})
    addroom("yzqz","扬州钱庄",{Station:"扬州钱庄"})
    addroom("yzdp","扬州当铺",{Landmark:"Tang nan"})
    addroom("yztj","扬州铁匠",{Landmark:"Wang tiejiang"})
    addroom("yzzxl","扬州醉仙楼",{Station:"醉仙楼"})
    addroom("yzcg","春来茶馆",{Station:"春来茶馆"})
    addroom("yzyp","扬州药铺",{Landmark:"Ping yizhi"})
    addroom("yzsy","扬州书院",{Landmark:"Fu zi"})
    addroom("yzkd","扬州客店",{Landmark:"Song shengyi"})
})(App)