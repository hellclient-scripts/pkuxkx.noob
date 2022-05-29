(function(app){
    app.Data.Room={
        ID:"",
        Name:"",
        Desc:"",
        Tags:"",
        Objs:[],
    }
    app.Core.OnRoom=function(name, output, wildcards){
        let id=app.Data.Room.ID
        app.Data.Room={
            ID:id,
            Name:wildcards[1],
            Desc:"",
            Tags:wildcards[3],
            Objs:[],
        }
        world.EnableTriggerGroup("roomexit",true)
    }
    var exitsre = new RegExp("[a-z]*[^、 和\n]", "g");
    app.Core.OnRoomDesc=function(name, output, wildcards){
        if (app.Data.Room.Exits==null){
            app.Data.Room.Desc+=output+"\n"
        }
    }
    app.Core.OnRoomExits=function(name, output, wildcards){
        world.EnableTrigger("room_desc",false)
        world.EnableTriggerGroup("roomexit",false)
        world.EnableTriggerGroup("roomobj",true)
        if (name!="room_noexit"){
            var exits=wildcards[1].match(exitsre).sort()
            app.Data.Room.Exits=exits
        }else{
            app.Data.Room.Exits=[]
        }
        app.Raise("OnRoomExits")
    }
    app.Core.OnRoomObj=function(name, output, wildcards){
        var obj={ID:wildcards[1],Name:wildcards[0]}
        app.Data.Room.Objs.push(obj)
        app.Raise("OnRoomObj",obj)
    }
    app.HasRoomObj=function(id){
        for(var i in app.Data.Room.Objs){
            if (app.Data.Room.Objs[i].ID===id){
                return true
            }
        }
        return false
    }
    app.Core.OnRoomObjEnd=function(name, output, wildcards){
        world.EnableTriggerGroup("roomobj",false)
        app.Raise("OnRoomEnd")
    }
})(App)