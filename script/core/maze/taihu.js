(function (App) {
    let basicmaze = Include("include/maze.js")
    let Maze = function (param) {
        basicmaze.call(this, param)
        this.ID = "太湖"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped = function (move) {
        let result=App.Data.Room.Name != "太湖"
        if (result&&this.CmdAfter){
            App.Send(this.CmdAfter)
            this.CmdAfter=""
        }
        return result
    }
    Maze.prototype.Init = function () {
        App.Send("#sail")
        this.CmdAfter="#halt"
    }
    return Maze
})(App)