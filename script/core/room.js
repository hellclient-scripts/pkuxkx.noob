(function(app){
    app.Data.Room={}
    app.Core.OnRoom=function(name, output, wildcards){
        app.Data.Room={
            Name:wildcards[1],
            Desc:"",
            Objs:[],
            ObjsMap:{},
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
        world.EnableTriggerGroup("roomexit",false)
        world.EnableTriggerGroup("roomobj",true)
        var exits=wildcards[1].match(exitsre).sort()
        app.Data.Room.Exits=exits
    }
    App.Core.OnRoomObj=function(name, output, wildcards){
        app.Data.Room.Objs.push({ID:wildcards[1],Name:wildcards[0]})
        app.Data.Room.ObjsMap[wildcards[1].toLowerCase()]=wildcards[0]
    }
    App.Core.OnRoomObjEnd=function(name, output, wildcards){
        if (output.length<3 || output.slice(0,4)!="    "){
            world.EnableTriggerGroup("roomobj",false)
        }
    }
})(App)