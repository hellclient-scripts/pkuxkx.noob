(function(App){
    App.Data.Room={
        ID:"",
        Name:"",
        Desc:"",
        Tags:"",
        Objs:[],
    }
    App.Core.OnRoom=function(name, output, wildcards){
        let id=App.Data.Room.ID
        App.Data.Room={
            ID:id,
            Name:wildcards[1],
            Desc:"",
            Tags:wildcards[3],
            Objs:[],
        }
        world.EnableTriggerGroup("roomexit",true)
    }
    var exitsre = new RegExp("[a-z]*[^、 和\n]", "g");
    App.Core.OnRoomDesc=function(name, output, wildcards){
        if (App.Data.Room.Exits==null){
            App.Data.Room.Desc+=output+"\n"
        }
    }
    App.Core.OnRoomExits=function(name, output, wildcards){
        world.EnableTrigger("room_desc",false)
        world.EnableTriggerGroup("roomexit",false)
        world.EnableTriggerGroup("roomobj",true)
        if (name!="room_noexit"){
            var exits=wildcards[1].match(exitsre).sort()
            App.Data.Room.Exits=exits
        }else{
            App.Data.Room.Exits=[]
        }
        App.Raise("OnRoomExits")
    }
    App.Core.OnRoomObj=function(name, output, wildcards){
        var obj={ID:wildcards[1],Name:wildcards[0]}
        App.Data.Room.Objs.push(obj)
        App.Raise("OnRoomObj",obj)
    }
    App.HasRoomObj=function(id){
        for(var i in App.Data.Room.Objs){
            if (App.Data.Room.Objs[i].ID===id){
                return true
            }
        }
        return false
    }
    App.Core.OnRoomObjEnd=function(name, output, wildcards){
        world.EnableTriggerGroup("roomobj",false)
        App.Raise("OnRoomEnd")
    }
})(App)