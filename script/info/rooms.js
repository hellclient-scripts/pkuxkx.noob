(function(app){
    app.Info.Rooms={}
    app.Info.Roomnames={}
    app.Info.Roomobjs={}
    app.RegisterCallback("info.room.objlocate",function(data){
        if (!app.Data.Room.ID && app.Info.Roomobjs[data.ID]){
            app.Data.Room.ID=app.Info.Roomobjs[data.ID]
            world.Note("定位成功，位于 "+app.Info.Rooms[app.Data.Room.ID]+"("+app.Data.Room.ID+")")
        }
    })
    app.Bind("OnRoomObj","info.room.objlocate")
    app.RegisterCallback("info.room.namelocate",function(){
        var id=app.Info.Roomnames[app.Data.Room.Name]
        if (id){
            app.Data.Room.ID=id
            world.Note("定位成功，位于 "+app.Info.Rooms[app.Data.Room.ID]+"("+app.Data.Room.ID+")")
        }
    })
    app.Bind("OnRoomExits","info.room.namelocate")

    var addroom=function(id,name){
        app.Info.Rooms[id]=name
    }
    addroom("yzgc","扬州广场")
    app.Info.Roomobjs["Rong shu"]="yzgc"
    addroom("yzqz","扬州钱庄")
    app.Info.Roomnames["扬州钱庄"]="yzqz"
    addroom("yzdp","扬州当铺")
    app.Info.Roomobjs["Tang nan"]="yzdp"
    addroom("yztj","扬州铁匠")
    app.Info.Roomobjs["Wang tiejiang"]="yztj"
    addroom("yzzxl","扬州醉仙楼")
    app.Info.Roomnames["醉仙楼"]="yzzxl"
    addroom("yzcg","春来茶馆")
    app.Info.Roomnames["春来茶馆"]="yzcg"
    addroom("yzyp","扬州药铺")
    app.Info.Roomobjs["Ping yizhi"]="yzyp"
    addroom("yzsy","扬州书院")
    app.Info.Roomobjs["Fu zi"]="yzsy"
    addroom("yzkd","扬州客店")
    app.Info.Roomobjs["Song shengyi"]="yzkd"
})(App)