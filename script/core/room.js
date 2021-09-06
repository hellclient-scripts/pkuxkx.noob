(function(app){
    app.Data.Room={}
    app.Core.OnRoom=function(name, output, wildcards){
        app.Data.Room={
            ID:"",
            Name:wildcards[1],
            Desc:"",
            Tags:wildcards[2],
            Objs:[],
        }
        world.EnableTriggerGroup("roomexit",true)
    }
    var exitsre = new RegExp("[a-z]*[^、 和]", "g");
    App.Core.OnRoomDesc=function(name, output, wildcards){
        if (app.Data.Room.Exits==null){
            app.Data.Room.Desc+=output+"\n"
        }
    }
    App.Core.OnRoomExits=function(name, output, wildcards){
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
    App.Core.OnRoomObj=function(name, output, wildcards){
        var obj={ID:wildcards[1],Name:wildcards[0]}
        app.Data.Room.Objs.push(obj)
        app.Raise("OnRoomObj",obj)
    }
    App.Core.OnRoomObjEnd=function(name, output, wildcards){
        world.EnableTriggerGroup("roomobj",false)
    }
})(App)