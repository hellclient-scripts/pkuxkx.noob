





















(function (App) {
    let basicmaze = Include("include/maze.js")
    let Maze = function (param) {
        basicmaze.call(this, param)
        this.ID = "爬峭壁"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped = function (move) {
        let result=App.Data.Room.Name != "悬崖"
        if (result){
            App.Send(" ")
        }
        return result
    }
    Maze.prototype.Init = function () {
        App.Send("climb stiff")
    }
    return Maze
})(App)