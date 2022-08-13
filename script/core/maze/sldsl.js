(function (App) {
    let basicmaze = Include("include/maze.js")
    let Maze = function (param) {
        basicmaze.call(this, param)
        this.ID = "神龙岛树林"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped = function (move) {
        return App.Data.Room.Name != "树林"
    }
    Maze.prototype.Explore = function (move) {
        App.Go(this.Current)
    }
    return Maze
})(App)