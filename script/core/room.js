(function (App) {
    let chinesere = /[\u4e00-\u9fa5]/
    App.Core.RedBGExits = []
    App.Data.Room = {
        ID: "",
        Name: "",
        Tags: "",
        Objs: [],
        LootCmds: {},
        HasHerb: false,
        ObjEnd: false,
        OnAsk: "",
        YieldYes: false,
        Looking: false,
        Online: null,
        WalkTags:[],
        Data: {},
        Died:{},
        MoveRetried:0
    }
    App.Core.RoomDesc = {
        Mode: 0,//0:地图，1:描述,2:环境,3:雾中
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
        App.Core.RedBGExits = []
        let looking = App.Data.Room.Looking
        let oid = App.Data.Room.ID
        let owalktags=App.Data.Room.WalkTags
        let oonliie=App.Data.Room.Online
        let odata=App.Data.Room.Data
        App.Data.Room = {
            ID: "",
            Name: wildcards[1],
            Tags: wildcards[5],
            Objs: [],
            HasHerb: false,
            OnAsk: "",
            YieldYes: false,
            LootCmds: {},
            ObjEnd: false,
            Looking: false,
            Online: null,
            WalkTags:[],
            Died:{},
            Data: {},
            MoveRetried:0,
        }
        if (looking){
            App.Data.Room.WalkTags=owalktags
            App.Data.Room.Online=oonliie
            App.Data.Room.Data=odata
            if (oid){
                App.Data.Room.ID = oid
            }
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
    let blankWords = function (line, index) {
        let words = line.Words.slice(0, index)
        for (var i = 0; i < words.length; i++) {
            if (words[i].Text.trim() != "") {
                return false
            }
        }
        return true
    }
    App.Core.OnRoomDesc = function (name, output, wildcards) {
        if (App.Data.Room.Exits != null) {
            return
        }
        if (output.startsWith("    一片浓雾中，什么也看不清。")){
            App.Core.RoomDesc.Mode = 3
            return
        }
        let line = JSON.parse(DumpOutput(1))[0]
        if (App.Core.RoomDesc.Mode == 1) {
            if (output.trim() == "炊烟不断地从路边的小屋里飘出。") {
                App.Core.RoomDesc.Mode = 2
                return
            }
            let o = output.trim().slice(0, 5)
            switch (o) {
                case "「初春」:":
                case "「早春」:":
                case "「阳春」:":
                case "「初夏」:":
                case "「仲夏」:":
                case "「盛夏」:":
                case "「初秋」:":
                case "「高秋」:":
                case "「深秋」:":
                case "「初冬」:":
                case "「隆冬」:":
                case "「寒冬」:":    
                    App.Core.RoomDesc.Mode = 2
                    return
            }
        }
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
                if ((output.slice(0, 8).trim() == "") && !blankWords(line, 5)) {
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
            case 3:
                App.Data.Room.Exits=[]
                return
        }
    }
    world.EnableTrigger("room_desc", false)
    world.EnableTriggerGroup("roomexit", false)
    world.EnableTriggerGroup("roomobj", false)
    App.Core.OnRoomExitsStart = function (name, output, wildcards) {
        world.EnableTrigger("room_desc", false)
        App.Data.Room.Exits = []
    }
    App.Core.OnRoomExits = function (name, output, wildcards) {
        world.EnableTriggerGroup("roomexit", false)
        world.EnableTriggerGroup("roomobj", true)
        let lines = JSON.parse(DumpOutput(wildcards[1].split("\n").length))
        lines.forEach(function (line) {
            line.Words.forEach(function (word) {
                if (word.Background == "Red") {
                    App.Core.RedBGExits.push(word.Text)
                }
            })
        })
        if (wildcards[1]) {
            var exits = wildcards[1].match(exitsre).sort()
            App.Data.Room.Exits = exits
        } else {
            App.Data.Room.Exits = []
        }
        App.Raise("OnRoomExits")
        App.RaiseStateEvent("core.onroomexits")
    }
    App.Core.OnRoomObj = function (name, output, wildcards) {
        var obj = { ID: wildcards[1], Name: wildcards[0],Status:wildcards[3]}
        App.Data.Room.Objs.push(obj)
        App.Raise("OnRoomObj", obj)
    }
    App.GetRoomObjByName = function (name) {
        for (var i in App.Data.Room.Objs) {
            if (App.Data.Room.Objs[i].Name === name) {
                return App.Data.Room.Objs[i].ID
            }
        }
        return ""
    }
    App.HasRoomObjName = function (name) {
        return App.GetRoomObjByName(name) != ""
    }
    App.GetRoomObj = function (id, ci) {
        if (ci) {
            id = id.toLowerCase()
        }
        for (var i in App.Data.Room.Objs) {
            let oid = App.Data.Room.Objs[i].ID
            if (ci) {
                oid = oid.toLowerCase()
            }
            if (oid === id) {
                return App.Data.Room.Objs[i]
            }
        }
        return null
    }
    App.HasRoomObj = function (id, ci) {
        return App.GetRoomObj(id, ci) != null
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
    App.Core.RoomObjEnd = function () {
        if (!App.Data.Room.ObjEnd) {
            App.Data.Room.ObjEnd = true
            App.Raise("OnRoomEnd")
        }
        world.EnableTriggerGroup("roomobj", false)
    }
    App.Core.OnRoomObjEnd = function (name, output, wildcards) {
        if (output && output != "> " && !output.match(chinesere)) {
            return
        }
        App.Core.RoomObjEnd()
    }
    App.Core.OnRoomHerb = function () {
        App.Data.Room.HasHerb = true
    }
    
    App.Core.OnRoom.NPCDie=function(name){
        let data=App.Data.Room.Died[name]
        if (data==null){
            data=0
        }
        data++
        App.Data.Room.Died[name]=data
    }
    App.IsNPCDied=function(name){
        return App.Data.Room.Died[name]
    }
    App.SetLootCmd = function (name, cmd) {
        App.Data.Room.LootCmds[name] = cmd
    }
    App.SetRoomOnAsk = function (cmd) {
        Note("设置OnAsk:" + cmd)
        App.Data.Room.OnAsk = cmd
    }
    App.Look = function () {
        App.Data.Room.Looking = true
        App.Send("l")
    }
    App.SetRoomYieldYes = function (data) {
        Note("设置YieldYes:" + data)
        App.Data.Room.YieldYes = data
    }
    App.SetRoomOnline = function (func) {
        App.Data.Room.Online = func
    }
    App.SetRoomData = function (key, value) {
        App.Data.Room.Data[key] = value
    }
    App.SetWalkTags = function (tags) {
        App.Data.Room.WalkTags = tags
    }
    App.RegisterCallback("core.room.inittags",function(){
        for(var i=0;i<App.Data.Room.WalkTags.length;i++){
            Mapper.settag(App.Data.Room.WalkTags[i],true)
        }
    })
    App.Bind("PathInit","core.room.inittags")
    App.GetRoomData = function (key) {
        return App.Data.Room.Data[key]
    }
    App.Core.OnRoomLine = function (name, output, wildcards) {
        if (App.Data.Room.Online) {
            App.Data.Room.Online(output)
        }
    }
    App.RegisterCallback("core.room.alias.onask", function (data) {
        App.SetRoomOnAsk(data)
    })
    App.RegisterAlias("onask", "core.room.alias.onask")

    App.RegisterCallback("core.room.onask", function () {
        if (App.Data.Room.OnAsk) {
            App.Send(App.Data.Room.OnAsk)
            App.Data.Room.OnAsk = ""
        }
    })
    App.Core.OnRoomNoAction = function (name, output, wildcards) {
        App.RaiseStateEvent("core.noaction")
    }
    App.Bind("ask", "core.room.onask")
})(App)