(function (App) {
    let basicmaze = Include("include/maze.js")
    let Maze = function (param) {
        basicmaze.call(this, param)
        this.ID = "苗岭山林"
    }
    let exitsw = ["wu", "w", "wd"]
    let exitse = ["eu", "e", "ed"]
    let exitsn = ["nu", "n", "nd"]
    let exitss = ["su", "s", "sd"]
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped = function (move) {
        return App.Data.Room.Name != "苗岭山林"
    }
    Maze.prototype.Dir=function(){
        switch (this.Current) {
            case "西":
                return exitsw
            case "北":
                return exitsn
            case "南":
                return exitss
            default:
                return exitse
        }
    }
    Maze.prototype.Explore = function (move) {
        if (App.HasRoomExit("out")) {
            App.Go("go out")
            return
        }
        App.Go(RandomList(this.Dir()))
    }
    Maze.prototype.OnStateEvent = function (move, state, event, data) {
        switch (event) {
            case "move.wrongway":
            case "move.notallowed":
                let dir = this.Dir()
                let exit = RandomList(dir)
                world.DoAfterSpecial(1, 'App.Go("' + exit + '")', 12);
                return true
                break;
        }
        return false
    }
    return Maze
})(App)