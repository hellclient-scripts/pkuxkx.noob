(function (App) {
    let basicmaze = Include("include/maze.js")
    let Maze = function (param) {
        basicmaze.call(this, param)
        this.ID = "关外冰面"
        this.Yell = false
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped = function (move) {
        if (this.Current == "e") {
            return App.Data.Room.Name == "大门坎子"
        } else {
            return App.Data.Room.Name == "船厂"
        }
    }
    Maze.prototype.Explore = function (move) {
        if (this.Current == "e") {
            switch (App.Data.Room.Name) {
                case "船厂":
                    App.Go("e")
                    break
                case "冰面":
                    App.Go("e")
                    break
                case "渡船":
                    App.Send("#sail")
                    break
            }
        } else {
            switch (App.Data.Room.Name) {
                case "大门坎子":
                    App.Go("w")
                    break
                case "冰面":
                    App.Go("w")
                    break
                case "渡船":
                    App.Send("#sail")
                    break
            }
        }
    }    
    Maze.prototype.Init = function () {
        this.Yell = false
    }
    return Maze
})(App)