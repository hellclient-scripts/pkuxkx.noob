(function (App) {
    let chinesere = /[\u4e00-\u9fa5]/
    App.Core.RedBGExits = []
    App.Data.WalkZone = ""
    App.Data.Room = {
        ID: "",
        Name: "",
        Location:"",
        Tags: "",
        Objs: [],
        LootCmds: {},
        HasHerb: false,
        ObjEnd: false,
        OnAsk: "",
        YieldYes: false,
        Looking: false,
        Online: null,
        OnEvent: null,
        Place: "",
        WalkTags: [],
        Data: {},
        Died: {},
        MoveRetried: 0
    }
    App.Core.RoomDesc = {
        Mode: 0,//0:地图，1:描述,2:环境,3:雾中,4:对象,5:图像,6:提示
        Desc: "",
        Canlook: "",
        Canget: "",
        Env: "",
        Map: "",
        Picture:"",
        Notice:"",
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
        world.ResetTimer("objend_timeout")
        world.EnableTimer("objend_timeout", true)
        App.Core.RedBGExits = []
        let looking = App.Data.Room.Looking
        let oid = App.Data.Room.ID
        let owalktags = App.Data.Room.WalkTags
        let oonline = App.Data.Room.Online
        let oonevent = App.Data.Room.OnEvent
        let odata = App.Data.Room.Data
        let odied = App.Data.Room.Died
        App.Data.Room = {
            ID: "",
            Name: wildcards[1],
            Location:wildcards[3],
            Tags: wildcards[5],
            NameDump: SubDumpLine(0, wildcards[1].length),
            Objs: [],
            HasHerb: false,
            OnAsk: "",
            YieldYes: false,
            LootCmds: {},
            ObjEnd: false,
            Looking: false,
            Online: null,
            OnEvent: null,
            WalkTags: [],
            Died: {},
            Data: {},
            MoveRetried: 0,
            Place: "",
            Exits: null,
        }
        if (looking) {
            App.Data.Room.WalkTags = owalktags
            App.Data.Room.Online = oonline
            App.Data.Room.Data = odata
            App.Data.Room.Died = odied
            App.Data.Room.OnEvent = oonevent
            if (oid) {
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
            Picture:"",
            Notice:"",
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
        world.EnableTriggerGroup("roomobj", true)
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
    let roomreplacre = /[\n\s━┃／＼]+/g
    let renotice=/^\s+┌─+┐\s*$/
    App.Core.OnRoomPlace = function (name, output, wildcards) {
        let str = [wildcards[0], wildcards[1], wildcards[2].replace(roomreplacre, "")].join(",")
        App.Data.Room.Place = str
        App.Raise("core.room.place")
    }
    App.Core.OnRoomDesc = function (name, output, wildcards) {
        if (output.startsWith("【闲聊】")){
            return
        }
        if (App.Data.Room.Exits != null) {
            return
        }
        if (output.startsWith("    一片浓雾中，什么也看不清。")) {
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
                if ((line.Words.length==0||line.Words.length==1)&&output.trim()==""){
                    App.Core.RoomDesc.Mode=5
                    return
                }
                if (output.match(renotice)){
                    App.Core.RoomDesc.Mode=6
                    return
                }
                App.Core.RoomDesc.Desc += output + "\n"
                App.Core.RoomLines.DescLines.push(line)
                break
            case 2:
                App.Core.RoomDesc.Env += output + "\n"
                App.Core.RoomLines.EnvLines.push(line)
                break
            case 3:
                App.Data.Room.Exits = []
                return
            case 5:
                App.Core.RoomDesc.Picture += output + "\n"
                return
            case 6:
                if (output.trim()==""){
                    App.Core.RoomDesc.Mode=5
                    return
                }
                App.Core.RoomDesc.Notice += output + "\n"
                return
        }
    }
    world.EnableTrigger("room_desc", false)
    world.EnableTriggerGroup("roomexit", false)
    world.EnableTriggerGroup("roomobj", false)
    world.EnableTriggerGroup("roomobjend", false)
    world.EnableTimer("objend_timeout", false)
    App.Core.OnRoomExitsStart = function (name, output, wildcards) {
        world.EnableTrigger("room_desc", false)
        App.Data.Room.Exits = []
    }
    App.Core.OnRoomExits = function (name, output, wildcards) {
        world.EnableTriggerGroup("roomexit", false)
        world.EnableTriggerGroup("roomobjend", true)
        let lines = JSON.parse(DumpOutput(wildcards[1].split("\n").length))
        lines.forEach(function (line) {
            line.Words.forEach(function (word) {
                if (word.Background == "Red") {
                    App.Core.RedBGExits.push(word.Text)
                }
            })
        })
        //能看到exit说明有描述了。
        App.Data.NeedRoomDesc=false
        if (wildcards[1]) {
            var exits = wildcards[1].match(exitsre).sort()
            App.Data.Room.Exits = exits
        } else {
            App.Data.Room.Exits = []
        }
        App.Raise("OnRoomExits")
        App.RaiseStateEvent("core.onroomexits")
    }
    App.Core.OnRoomGMCPMove = function (exits) {
        App.Data.Room.Exits = exits.sort()
        App.RaiseStateEvent("core.onroomgmcpexits")
        App.Core.RoomObjEnd()
    }
    App.RegisterCallback("core.room.ga", function () {
        App.Core.RoomObjEnd()
    })
    App.Bind("GA", "core.room.ga")
    let relast = /[ 」]/g
    App.Core.OnRoomOther=function(name, output, wildcards){
        
    }
    App.Core.OnRoomObj = function (name, output, wildcards) {
        if (App.Data.Room.Exits === null) {
            App.Data.Room.Exits === []
            world.EnableTriggerGroup("roomexit", false)
            world.EnableTriggerGroup("roomobjend", true)
        }
        var obj = { ID: wildcards[2], Name: wildcards[0], Status: wildcards[4],Comment:wildcards[7]}
        obj.Last = wildcards[0].split(relast).slice(-1)[0]
        obj.LastDump = SubDumpLine(4 + wildcards[0].length - obj.Last.length, 4 + wildcards[0].length)
        App.Data.Room.Objs.push(obj)
        App.Raise("OnRoomObj", obj)
    }
    App.GetRoomObjByName = function (name) {
        for (var i in App.Data.Room.Objs) {
            if (App.Data.Room.Objs[i].Name === name) {
                return App.Data.Room.Objs[i]
            }
        }
        return null
    }
    App.GetRoomObjIDByName = function (name) {
        let obj = App.GetRoomObjByName(name)
        return obj ? obj.ID : ""
    }
    App.GetRoomObjByPref = function (pref) {
        for (var i in App.Data.Room.Objs) {
            if (App.Data.Room.Objs[i].Name.startsWith(pref)) {
                return App.Data.Room.Objs[i]
            }
        }
        return null
    }
    App.GetRoomObjBySuff = function (suff) {
        for (var i in App.Data.Room.Objs) {
            if (App.Data.Room.Objs[i].Name.endsWith(suff)) {
                return App.Data.Room.Objs[i]
            }
        }
        return null
    }

    App.HasRoomObjName = function (name) {
        return App.GetRoomObjIDByName(name) != ""
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
            world.EnableTimer("objend_timeout", false)
            App.Data.Room.ObjEnd = true
            App.Raise("OnRoomEnd")
        }
        world.EnableTriggerGroup("roomobj", false)
        world.EnableTriggerGroup("roomexit", false)
        world.EnableTriggerGroup("roomobjend", false)
    }
    App.Core.OnRoomObjEnd = function (name, output, wildcards) {
        if (App.Data.Room.Exits === null) {
            return
        }
        if (output == "") {
            return
        }
        if (output && output != "> " && !output.match(chinesere)) {
            return
        }
        App.Core.RoomObjEnd()
    }
    App.Core.OnRoomHerb = function () {
        App.Data.Room.HasHerb = true
    }

    App.Core.OnRoom.NPCDie = function (name) {
        Note("Npc "+name+" 死亡。")
        let data = App.Data.Room.Died[name]
        if (data == null) {
            data = 0
        }
        data++
        App.Data.Room.Died[name] = data
    }
    App.RaiseRoomEvent = function (event, data) {
        if (App.Data.Room.OnEvent) {
            App.Data.Room.OnEvent(event, data)
        }
    }
    App.IsNPCDied = function (name) {
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
        if (!App.Data.Room.Looking) {
            App.Data.Room.Looking = true
            App.Send("l")
        }
    }
    App.RegisterCallback("core.resetlooking",function(){
        App.Data.NeedRoomDesc=false
        App.Data.Room.Looking=false
    })
    App.Bind("core.conscious","core.resetlooking")
    App.Bind("core.leaveinstance","core.resetlooking")
    App.Bind("core.enterinstance","core.resetlooking")
    App.Bind("Connected","core.resetlooking")
    App.SetRoomYieldYes = function (data) {
        Note("设置YieldYes:" + data)
        App.Data.Room.YieldYes = data
    }
    App.SetRoomOnline = function (func) {
        App.Data.Room.Online = func
    }
    App.SetRoomOnEvent = function (func) {
        App.Data.Room.OnEvent = func
    }
    App.SetRoomData = function (key, value) {
        App.Data.Room.Data[key] = value
    }
    App.SetWalkTags = function (tags) {
        App.Data.Room.WalkTags = tags
    }
    App.RegisterCallback("core.room.inittags", function () {
        for (var i = 0; i < App.Data.Room.WalkTags.length; i++) {
            Mapper.settag(App.Data.Room.WalkTags[i], true)
        }
    })
    App.Bind("PathInit", "core.room.inittags")
    App.GetRoomData = function (key) {
        return App.Data.Room.Data[key]
    }
    App.Core.OnRoomLine = function (name, output, wildcards) {
        if (App.Data.Room.Online) {
            App.Data.Room.Online(output)
        }
        App.Raise("core.online",output)
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
    App.Core.OnRoomNoFight = function (name, output, wildcards) {
        App.SetRoomData("core.nofight", true)
        App.RaiseRoomEvent("core.nofight")
        App.RaiseStateEvent("core.nofight")
    }
    App.Core.OnRoomNoAction = function (name, output, wildcards) {
        App.RaiseRoomEvent("core.noaction")
        App.RaiseStateEvent("core.noaction")
    }
    App.Bind("ask", "core.room.onask")
    App.CheckWalkZone = function () {
        App.Data.WalkZone = ""
        App.Send("walk")
    }
    App.Core.OnRoomWalkZone = function (name, output, wildcards) {
        App.Data.WalkZone = wildcards[0]
    }
    App.Core.OnRoomWalkZone2 = function (name, output, wildcards) {
        App.Data.WalkZone = wildcards[0]
    }
    App.Core.RoomLimited = { "home": "yz-sczh" }
    App.LeaveLimitedRoom = function () {
        if (App.Core.RoomLimited[App.Data.Room.ID]) {
            App.NewCommand("to", App.Options.NewWalk(App.Core.RoomLimited[App.Data.Room.ID])).Push()
        }
        App.Next()
    }
    App.Core.OnLeaveInstance = function (name, output, wildcards) {
        App.Raise("core.leaveinstance", output)
        App.RaiseStateEvent("core.leaveinstance", output)
        App.Send("l")
    }
    //进入副本指令，一般发送look，触发objend。
    App.Core.EnterInstanceCommands = {
        "你进入了剑心居。": "l",
    }
    App.Core.OnBlind = function (name, output, wildcards) {
        App.Data.Room.Looking=false
        App.RaiseStateEvent("core.blind", output)
    }
    App.Core.CurrentInstance=""
    App.Core.OnEnterInstance = function (name, output, wildcards) {
        App.Core.CurrentInstance=output
        world.DoAfterSpecial(2, 'App.Core.OnEnterInstanceExecute()', 12);
    }
    App.Core.OnEnterInstanceExecute=function(){
        let output=App.Core.CurrentInstance
        App.Raise("core.enterinstance", output)
        App.RaiseStateEvent("core.enterinstance", output)
        if (App.Core.EnterInstanceCommands[output]) {
            App.Send(App.Core.EnterInstanceCommands[output])
        }
        App.Core.SendConnectCommand()

    }
    App.Core.OnZhangsan = function (name, output, wildcards) {
        App.Raise("core.zhangsan", output)
    }

})(App)