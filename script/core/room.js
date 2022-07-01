(function (App) {
    App.Core.RedBGExits=[]
    App.Data.Room = {
        ID: "",
        Name: "",
        Tags: "",
        Objs: [],
        LootCmds:{},
        ObjEnd:false
    }
    App.Core.RoomDesc = {
        Mode: 0,//0:地图，1:描述,2:环境
        Desc: "",
        Canlook: "",
        Canget: "",
        Env: "",
        Map: "",
    }
    App.Core.RoomLines = {
        NameLane: null,
        DescLines: [],
        CanlookLine: null,
        CangetLine: null,
        EnvLines: [],
        MapLines: [],
    }
    App.Core.OnRoom = function (name, output, wildcards) {
        App.Core.RedBGExits=[]
        App.Data.Room = {
            ID: "",
            Name: wildcards[1],
            Tags: wildcards[3],
            Objs: [],
            LootCmds:{},
            ObjEnd:false,
        }
        App.Core.RoomDesc = {
            Mode: 0,
            Desc: "",
            Canlook: "",
            Canget: "",
            Env: "",
            Map: "",
        }
        App.Core.RoomLines = {
            NameLine: JSON.parse(DumpOutput(1))[0],
            DescLines: [],
            CanlookLine: null,
            CangetLine: null,
            EnvLines: [],
            MapLines: [],
        }
        world.EnableTriggerGroup("roomexit", true)
        App.RaiseStateEvent("core.onroom")
    }
    var exitsre = new RegExp("[a-z]*[^、 和\n]", "g");
    App.Core.OnRoomDesc = function (name, output, wildcards) {
        if (App.Data.Room.Exits != null) {
            return
        }
        let line = JSON.parse(DumpOutput(1))[0]
        if (output.slice(0, 15) == "    你可以看看(look)") {
            App.Core.RoomDesc.Mode = 2
            App.Core.RoomDesc.Canlook = output
            App.Core.RoomLines.CanlookLine = line
            return
        }
        if (output.slice(0, 14) == "    你可以获取(get)") {
            App.Core.RoomDesc.Mode = 2
            App.Core.RoomDesc.Canget = output
            App.Core.RoomLines.CangetLine = line
            return
        }
        switch (App.Core.RoomDesc.Mode) {
            case 0:
                if (!(output.slice(0, 4) == "    " && output.slice(4, 5) != " ")) {
                    App.Core.RoomDesc.Map += output + "\n"
                    App.Core.RoomLines.MapLines.push(line)
                    break
                }
                App.Core.RoomDesc.Mode = 1
            case 1:
                App.Core.RoomDesc.Desc += output + "\n"
                App.Core.RoomLines.DescLines.push(line)
                break
            case 2:
                App.Core.RoomDesc.Env += output + "\n"
                App.Core.RoomLines.EnvLines.push(line)
                break
        }
    }
    world.EnableTrigger("room_desc", false)
    world.EnableTriggerGroup("roomexit", false)
    world.EnableTriggerGroup("roomobj", false)
    App.Core.OnRoomExits = function (name, output, wildcards) {
        world.EnableTrigger("room_desc", false)
        world.EnableTriggerGroup("roomexit", false)
        world.EnableTriggerGroup("roomobj", true)
        let lines=JSON.parse(DumpOutput(wildcards[1].split("\n").length))
        lines.forEach(function(line){
            line.Words.forEach(function(word){
                if (word.Background=="Red"){
                    App.Core.RedBGExits.push(word.Text)
                }
            })
        })
        if (name != "room_noexit") {
            var exits = wildcards[1].match(exitsre).sort()
            App.Data.Room.Exits = exits
        } else {
            App.Data.Room.Exits = []
        }
        App.Raise("OnRoomExits")
        App.RaiseStateEvent("core.onroomexits")
    }
    App.Core.OnRoomObj = function (name, output, wildcards) {
        var obj = { ID: wildcards[1], Name: wildcards[0] }
        App.Data.Room.Objs.push(obj)
        App.Raise("OnRoomObj", obj)
    }
    App.HasRoomObjName = function (name) {
        for (var i in App.Data.Room.Objs) {
            if (App.Data.Room.Objs[i].Name === name) {
                return true
            }
        }
        return false
    }
    App.HasRoomObj = function (id, ci) {
        if (ci) {
            id = id.toLowerCase()
        }
        for (var i in App.Data.Room.Objs) {
            let oid = App.Data.Room.Objs[i].ID
            if (ci) {
                oid = oid.toLowerCase()
            }
            if (oid === id) {
                return true
            }
        }
        return false
    }
    App.HasRoomExit = function (exit) {
        for (var i in App.Data.Room.Exits) {
            if (exit == App.Data.Room.Exits[i]) {
                return true
            }
        }
        return false
    }
    App.HasRoomExits = function (exits) {
        for (var i in exits) {
            if (!App.HasRoomExit(exits[i])) {
                return true
            }
        }
        return true
    }
    App.Core.RoomObjEnd=function(){
        if (!App.Data.Room.ObjEnd){
            App.Data.Room.ObjEnd=true
            world.EnableTriggerGroup("roomobj", false)            
            App.Raise("OnRoomEnd")
        }
    }
    App.Core.OnRoomObjEnd = function (name, output, wildcards) {
        App.Core.RoomObjEnd()
    }
    App.SetLootCmd=function(name,cmd){
        App.Data.Room.LootCmds[name]=cmd
    }
})(App)