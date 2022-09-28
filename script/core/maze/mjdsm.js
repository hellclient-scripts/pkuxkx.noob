(function (App) {
    let basicmaze = Include("include/maze.js")
    let Maze = function (param) {
        basicmaze.call(this, param)
        this.ID = "明教大沙漠"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped = function (move) {
        return App.Data.Room.Exits&&App.Data.Room.Exits.length<4
    }
    Maze.prototype.Explore = function (move) {
        switch (this.Current) {
            case "e":
                if (this.Mode==0){
                    App.Go("e")
                    this.Mode=1
                }else{
                    App.Go("s")
                    this.Mode=0
                }
                break
            default:
                if (this.Mode==0){
                    App.Go("w")
                    this.Mode=1
                }else{
                    App.Go("n")
                    this.Mode=0
                }
                break
        }
    }
    Maze.prototype.Init=function(){
        this.Mode=0
    }

    return Maze
})(App)