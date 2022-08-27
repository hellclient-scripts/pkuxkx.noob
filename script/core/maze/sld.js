(function (App) {
    let basicmaze = Include("include/maze.js")
    let Maze = function (param) {
        basicmaze.call(this, param)
        this.ID = "善人渡"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped = function (move) {
        let result=App.Data.Room.Name == "万劫谷"
        if (result){
            App.Send(" ")
        }
        return result
    }
    Maze.prototype.Init = function () {
        App.Send("guo qiao")
    }
    return Maze
})(App)