(function (App) {
    const maxlevel = 200
    var Backward = Include("include/backward.js")
    let DFS = Include("include/dfs.js")
    let basicmaze = Include("include/maze.js")
    let ModeEnter = 0
    let ModeCheckingArrived = 1
    let ModeReady = 2
    let Maze = function (param) {
        basicmaze.call(this, param)
        this.ID = "Random"
        this.Finished = false
        this.Arrived = {}
        this.Command = null
        this.Start = ""
        this.IgnoreArrived = false
        this.Retry = false
        this.MaxDepth = maxlevel
        this.Mode = ModeEnter
        this.Visited = false
        this.RoomDesc = ""
        this.LastRoomDesc = ""
        this.LastCommand = null
        this.PendingKeys = []
        this.RoomInfo = ""
        this.Room = null
        this.CoreRoomDesc=null
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.CheckSuccess = function () {
        //必须实现这个接口，判断是否成功
        // let info=App.Info.RoomFull()
        // let data=SplitN(this.Current,".",2)  
        // return info==data[1]      
    }
    Maze.prototype.CheckWrongway = function () {
        //必须实现这个接口，判断是否走到了预期外的地点需要返回
        //return App.Data.Room.Tags=="[门派] [存盘点]"
        return false
    }
    Maze.prototype.EntryCmd = function () {
        let data = SplitN(this.Current, ".", 2)
        return data[0]
    }
    Maze.prototype.IsEscaped = function (move) {
        let escaped = (this.CheckSuccess() && this.Command)
        return escaped
    }
    Maze.prototype.Explore = function (move) {
        if (this.Command == null) {
            this.Start = App.Info.RoomFull()
            App.Send("unset brief")
            this.Command = (new DFS(this.MaxDepth, Backward)).New()
            let entrycmd = this.EntryCmd()
            if (typeof (entrycmd) == "string") {
                entrycmd = [entrycmd]
            }
            let level = this.Command.Arrive(entrycmd)
            this.Command = level.Next()
            App.NeedRoomDesc()
            App.Go(this.Command.Command)
            return;
        }
        if (this.Command) {
            App.NeedRoomDesc()
            App.Go(this.Command.Command)
        } else {
            App.Fail()
        }
    }
    Maze.prototype.GetExits = function () {
        return App.Data.Room.Exits
    }
    Maze.prototype.Fail = function (move) {
        // 如果失败，尝试不放弃重复房间重走一次
        if (!this.IgnoreArrived || this.Retry) {
            App.Fail()
            return
        }
        Note("探索失败，进入乱逛模式")
        this.Retry = true
        this.Command == null
        this.Explore(move)
    }
    Maze.prototype.TestArrived = function () {
        let key = this.PendingKeys[0]
        Note("观察 " + key + "方向，确定是否来过本房间")
        this.Room = App.Data.Room
        this.CoreRoomDesc=App.Core.RoomDesc
        App.Send("l " + key)
    }
    Maze.prototype.CheckArrived = function () {

        let info = App.Info.RoomFull()
        let roomdesc = info + App.Core.RoomDesc.Map + App.Info.RoomDesc()
        if (this.Room) {
            App.Data.Room = this.Room
        }
        if (this.CoreRoomDesc){
            App.Core.RoomDesc=this.CoreRoomDesc
        }
        let key = this.PendingKeys[0]
        if (this.Arrived[this.RoomDesc]&&this.Arrived[this.RoomDesc][key][roomdesc]) {
            Note("曾经来过本房间")
            this.Visited = true
            this.Mode = ModeReady
            this.GetNextCommand()
            return false
        }
        this.PendingKeys.shift()
        if (this.PendingKeys.length == 0) {
            Note("没有来过本房间")
            this.Visited = false
            this.Mode = ModeReady
            this.GetNextCommand()
            return false
        }
        this.TestArrived()
        return true
    }
    Maze.prototype.GetNextCommand = function () {
        this.Mode = ModeEnter
        if (this.Room){
            App.Data.Room=this.Room
        }
        if (!this.Visited) {
            if (this.LastCommand && (!this.LastCommand.IsBack) && this.LastRoomDesc && this.RoomDesc) {
                if (this.Arrived[this.RoomDesc] == undefined) {
                    this.Arrived[this.RoomDesc] = {}
                }
                if (this.Arrived[this.RoomDesc][Backward[this.LastCommand.Command]] == undefined) {
                    this.Arrived[this.RoomDesc][Backward[this.LastCommand.Command]] = {}
                }
                //A通过w到达B,所以B房间的e是A说明到达过
                this.Arrived[this.RoomDesc][Backward[this.LastCommand.Command]][this.LastRoomDesc] = true
            }
        }
        let giveup = (!this.Retry && this.Visited) || this.CheckWrongway()
        if (this.CheckWrongway() && this.RoomInfo != this.Start) {
            let to = this.Command.Level.Concat()
            to.push(this.Command.Command)
            App.Core.Maze.Info[this.Start + "-" + this.RoomInfo] = (to.join(";"))
            let fr = this.Command.Level.ConcatBackward()
            fr.unshift(Backward[this.Command.Command])
            App.Core.Maze.Info[this.RoomInfo + "-" + this.Start] = (fr.join(";"))
        }
        let level = this.Command.Arrive(giveup ? [] : this.GetExits())
        if (level == null) {
            this.Fail(move)
            return
        }
        this.Command = level.Next()
    }
    Maze.prototype.InitRoom = function () {
        let info = App.Info.RoomFull()
        this.RoomInfo = info
        let roomdesc = info + App.Core.RoomDesc.Map + App.Info.RoomDesc()
        this.LastRoomDesc = this.RoomDesc
        this.RoomDesc = roomdesc
        this.LastCommand = this.Command
        this.Visited = false
        this.PendingKeys = []
        this.Room = App.Data.Room
        if ((!this.IgnoreArrived) && this.Command && (!this.Command.IsBack) && this.RoomDesc) {
            if (this.Arrived[this.RoomDesc] == undefined) {
                this.Arrived[this.RoomDesc] = {}
            }
            let keys = Object.keys(this.Arrived[this.RoomDesc])
            if (keys.length > 0) {
                this.PendingKeys = keys
                this.Mode = ModeCheckingArrived
                this.TestArrived()
                return true
            }
        }
        this.Mode = ModeReady
        this.GetNextCommand()
        return false
    }
    Maze.prototype.OnStateEvent = function (move, state, event, data) {
        switch (event) {
            case "move.onRoomObjEnd":
                if (this.Command == null) {
                    break
                }
                switch (this.Mode) {
                    case ModeEnter:
                        return this.InitRoom()
                    case ModeCheckingArrived:
                        return this.CheckArrived()
                }
                break;
            case "core.bufffull":
                if (this.Command == null) {
                    break
                }
                world.DoAfterSpecial(App.Vehicle.RetryInterval, 'App.Go("' + this.Command.Command + '")', 12);

                break
            case "core.lookfail":
                world.DoAfterSpecial(1, 'App.RaiseStateEvent("maze.random.testarrive")', 12);

                break
            case "maze.random.testarrive":
                this.TestArrived()
                break
        }
        return false
    }
    Maze.prototype.Leave = function () {
        App.Send("set brief 3")
        basicmaze.prototype.Leave.call(this)

    }
    Maze.prototype.Init = function () {
        App.Data.Room.ID = ""
        this.Finished = false
        this.Arrived = {}
        this.Command = null
        this.Retry = false
        this.Mode = ModeEnter
        this.Visited = false
        this.RoomDesc = ""
        this.LastRoomDesc = ""
        this.LastCommand = null
        this.PendingKeys = []
        this.RoomInfo = ""
        this.Room = null
        this.CoreRoomDesc=null
    }
    return Maze
})(App)
