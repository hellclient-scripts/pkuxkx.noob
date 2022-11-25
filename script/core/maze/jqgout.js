(function (App) {
    let basicmaze = Include("include/maze.js")
    let Maze = function () {
        basicmaze.call(this)
        this.ID = "出绝情谷"
        this.Snap = null
        this.Path = ""
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped = function (move) {
        if (App.Data.Room.Name != "山洞口") {
            return false
        }
        return true
    }
    let re = /^([前后左右]\s*)+$/
    let cmds = {
        "前": "move qian",
        "后": "move hou",
        "左": "move zuo",
        "右": "move you",
    }
    Maze.prototype.Online = function (line) {
        if (line.match(re)) {
            this.Path = line
            App.SetRoomOnline(null)
        }
    }
    Maze.prototype.Check = function () {
        let self = this
        App.SetRoomOnline(null)
        if (this.Path == "") {
            throw "未找到绝情谷路径，请手动走一次"
        }
        let data = this.Path.split(" ")
        let result = []
        for (var i = 0; i < data.length; i++) {
            let cmd = cmds[data[i]]
            if (cmd) {
                result.push(cmd)
            }
        }
        App.Commands([
            App.NewCommand("move", App.Options.NewPath("enter")),
            App.NewCommand("move", App.Options.NewPath(result.join("&&"))),
            App.NewCommand("function", function () {
                App.Core.Snapshot.Rollback(self.Snap)
            }),
        ]).Push()
        App.Next()
    }

    Maze.prototype.Explore = function (move) {
        let self = this
        App.SetRoomOnline(function (line) { self.Online(line) })
        this.Snap = App.Core.Snapshot.Take("move.onRoomObjEnd")
        this.Path = ""
        App.Commands([
            App.NewCommand("do", "querypath"),
            App.NewCommand("nobusy"),
            App.NewCommand("function", function () { self.Check() }),
        ]).Push()
        App.Next()
    }
    return Maze
})(App)