(function (App) {
    let basicmaze = Include("include/maze.js")
    let Maze = function (param) {
        basicmaze.call(this, param)
        this.ID = "杀手帮果林返回"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped = function (move) {
        return App.Data.Room.Name != "果林"
    }
    Maze.prototype.Explore = function (move) {
        if (App.HasRoomObjName("梨树")){
            App.Go("s")
            return
        }
        App.Go("e")    }
    return Maze
})(App)