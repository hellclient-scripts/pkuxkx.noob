(function(app){
    app.Info.Rooms={}
    app.Info.Stations={}
    app.Info.Landmarks={}

    var addroom=function(id,desc,data){
        app.Info.Rooms[id]=desc
        if (data.Landmark){
            app.Info.Landmarks[data.Landmark]=id
        }
        if (data.Station){
            app.Info.Stations[data.Station]=id
        }
    }
    
    app.RegisterCallback("info.room.objlocate",function(data){
        if (!app.Data.Room.ID && app.Info.Landmarks[data.ID]){
            app.Data.Room.ID=app.Info.Landmarks[data.ID]
            world.Note("定位成功，位于 "+app.Info.Rooms[app.Data.Room.ID]+"("+app.Data.Room.ID+")")
        }
    })
    app.RegisterCallback("info.room.idlocate",function(){
        var id=app.Info.Stations[app.Data.Room.Name]
        if (id){
            app.Data.Room.ID=id
            world.Note("定位成功，位于 "+app.Info.Rooms[app.Data.Room.ID]+"("+app.Data.Room.ID+")")
        }
    })
    app.Bind("OnRoomObj","info.room.objlocate")
    app.Bind("OnRoomExits","info.room.idlocate")

    addroom("yzgc","扬州广场",{Landmark:"Rong shu"})
    addroom("yzqz","扬州钱庄",{Station:"扬州钱庄"})
    addroom("yzdp","扬州当铺",{Landmark:"Tang nan"})
    addroom("yztj","扬州铁匠",{Landmark:"Wang tiejiang"})
    addroom("yzzxl","扬州醉仙楼",{Station:"醉仙楼"})
    addroom("yzcg","春来茶馆",{Station:"春来茶馆"})
    addroom("yzyp","扬州药铺",{Landmark:"Ping yizhi"})
    addroom("yzsy","扬州书院",{Landmark:"Fu zi"})
    addroom("yzkd","扬州客店",{Landmark:"Song shengyi"})
    addroom("yzdtpns","扬州打铁铺内室",{Station:"打铁铺内室"})
    addroom("qfgl","曲阜鼓楼",{Station:"鼓楼"})
    addroom("xyzhq","信阳镇淮桥",{Station:"镇淮桥"})
    addroom("xcc","许昌城",{Station:"许昌城"})
    addroom("nyc","南阳城",{Station:"南阳城"})
    addroom("xydp","襄阳当铺",{Station:"襄阳当铺"})
    addroom("jz","荆州",{Station:"荆州"})
    addroom("rzc","汝州城",{Station:"汝州城"})

})(App)