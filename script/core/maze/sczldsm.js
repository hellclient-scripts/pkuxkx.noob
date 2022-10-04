(function (App) {
    let basicmaze = Include("include/maze.js")
    let Maze = function (param) {
        basicmaze.call(this, param)
        this.ID = "丝绸之路大沙漠"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped = function (move) {
        return App.Data.Room.Name!="大沙漠"
    }
    Maze.prototype.Explore = function (move) {
        App.Core.CheckBusy()
    }
    Maze.prototype.Init = function () {
        this.Mode = 0
    }
    Maze.prototype.OnStateEvent=function(move,state,event,data){
        switch (event){
            case "busy":
                world.DoAfterSpecial(1, 'App.Core.CheckBusy()', 12);
                break
            case "nobusy":
                switch (this.Current) {
                    case "e":
                        if (this.Mode == 0) {
                            App.Eat()
                            App.Eat()
                            App.Go("e")
                            this.Mode = 1
                        } else {
                            App.Eat()
                            App.Eat()
                            App.Go("s")
                            this.Mode = 0
                        }
                        break
                    default:
                        App.Eat()
                        App.Eat()
                        App.Go("w")
                        break
                }
                }
        return false
    }

    return Maze
})(App)