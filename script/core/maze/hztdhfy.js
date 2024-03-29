(function (App) {
    let basicmaze = Include("include/maze.js")
    App.Core.Maze.Data.hztdhfy = {}
    let Maze = function (param) {
        basicmaze.call(this, param)
        this.ID = "杭州提督府花园"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped = function (move) {
        if  (App.Data.Room.Name != "花园"){
            this.Snap=null
            return true
        }
        return false
    }
    Maze.prototype.Next = function () {
        App.SetRoomOnEvent(this.OnRoomEvent)
        App.NeedRoomDesc()
        if (App.Core.Maze.Data.hztdhfy.huacong) {
            App.Go(App.Core.Maze.Data.hztdhfy.huacong)
        } else {
            if (App.Core.Maze.Data.hztdhfy.safe.length == 0) {
                App.Core.Maze.Data.hztdhfy.safe.push("west")
            }
            App.Go(RandomList(App.Core.Maze.Data.hztdhfy.safe))
        }
        App.Next()
    }
    Maze.prototype.Look = function (direct) {
        App.Send("l " + App.Core.Maze.Data.hztdhfy.queue[0])
        App.Next()
    }
    Maze.prototype.Record = function () {
        let dir = App.Core.Maze.Data.hztdhfy.queue.shift()
        let desc = App.Info.RoomDesc()
        if (desc.indexOf("huacong") > -1) {
            App.Core.Maze.Data.hztdhfy.huacong = dir
        } else if (desc.indexOf("有一股让人觉得很危险的气息") < 0) {
            App.Core.Maze.Data.hztdhfy.safe.push(dir)
        }
        App.Next()
    }
    Maze.prototype.Init = function () {
        this.Snap=null
        App.Send("unset brief")
    }
    Maze.prototype.Leave=function(){
        App.Send("set brief 3")
        basicmaze.prototype.Leave.call(this)

    }
    Maze.prototype.Searching = function () {
        App.Core.Maze.Data.hztdhfy = {
            huacong: "",
            queue: ["n", "e", "s", "w"],
            safe: [],
        }
        let self=this
        this.Snap = App.Core.Snapshot.Take()
        App.Commands([
            App.NewCommand("delay", 1),
            App.NewCommand("function", this.Look),
            App.NewCommand("nobusy"),
            App.NewCommand("function", this.Record),
            App.NewCommand("delay", 1),
            App.NewCommand("function", this.Look),
            App.NewCommand("nobusy"),
            App.NewCommand("function", this.Record),
            App.NewCommand("delay", 1),
            App.NewCommand("function", this.Look),
            App.NewCommand("nobusy"),
            App.NewCommand("function", this.Record),
            App.NewCommand("delay", 1),
            App.NewCommand("function", this.Look),
            App.NewCommand("nobusy"),
            App.NewCommand("function", this.Record),
            App.NewCommand("function", this.Next),
            App.NewCommand("function", function () {
                App.Core.Snapshot.Rollback(self.Snap)
            })
        ]).Push()
        App.Next()
    }
    Maze.prototype.Bo = function () {
        let snap = App.Core.Snapshot.Take()
        App.Commands([
            App.NewCommand("nobusy"),
            App.NewCommand("function", function () {
                App.Core.Snapshot.Rollback(snap)
                App.NeedRoomDesc()
                App.Go("bo huacong&&enter")
            }),
        ]).Push()
        App.Next()
    }
    Maze.prototype.Explore = function (move) {
        if (App.Info.RoomDesc().indexOf("huacong") > -1) {
            this.Bo()
            return
        }
        this.Searching()
    }
    Maze.prototype.MovedAway=function(){
        App.Core.Snapshot.Rollback(this.Snap)
        App.Core.MoveRetry()
    }
    Maze.prototype.OnRoomEvent = function (event, data) {
        switch (event) {
            case "move.movedaway":
                Note("进入陷阱")
                this.MovedAway()
                break
        }
    }
    return Maze
})(App)