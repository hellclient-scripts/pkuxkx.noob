(function (App) {
    let basicmaze = Include("include/maze.js")
    let namedumps={
        "[{\"Text\":\"五\",\"Color\":\"Red\",\"Background\":\"\",\"Bold\":true,\"Underlined\":false,\"Blinking\":false,\"Inverse\":false},{\"Text\":\"行\",\"Color\":\"Red\",\"Background\":\"\",\"Bold\":true,\"Underlined\":false,\"Blinking\":false,\"Inverse\":false},{\"Text\":\"洞\",\"Color\":\"Red\",\"Background\":\"\",\"Bold\":true,\"Underlined\":false,\"Blinking\":false,\"Inverse\":false}]":"n",
        "[{\"Text\":\"五\",\"Color\":\"White\",\"Background\":\"\",\"Bold\":true,\"Underlined\":false,\"Blinking\":false,\"Inverse\":false},{\"Text\":\"行\",\"Color\":\"White\",\"Background\":\"\",\"Bold\":true,\"Underlined\":false,\"Blinking\":false,\"Inverse\":false},{\"Text\":\"洞\",\"Color\":\"White\",\"Background\":\"\",\"Bold\":true,\"Underlined\":false,\"Blinking\":false,\"Inverse\":false}]":"w",
        "[{\"Text\":\"五\",\"Color\":\"Yellow\",\"Background\":\"\",\"Bold\":true,\"Underlined\":false,\"Blinking\":false,\"Inverse\":false},{\"Text\":\"行\",\"Color\":\"Yellow\",\"Background\":\"\",\"Bold\":true,\"Underlined\":false,\"Blinking\":false,\"Inverse\":false},{\"Text\":\"洞\",\"Color\":\"Yellow\",\"Background\":\"\",\"Bold\":true,\"Underlined\":false,\"Blinking\":false,\"Inverse\":false}]":"n",
        "[{\"Text\":\"五\",\"Color\":\"Blue\",\"Background\":\"\",\"Bold\":true,\"Underlined\":false,\"Blinking\":false,\"Inverse\":false},{\"Text\":\"行\",\"Color\":\"Blue\",\"Background\":\"\",\"Bold\":true,\"Underlined\":false,\"Blinking\":false,\"Inverse\":false},{\"Text\":\"洞\",\"Color\":\"Blue\",\"Background\":\"\",\"Bold\":true,\"Underlined\":false,\"Blinking\":false,\"Inverse\":false}]":"e",
        "[{\"Text\":\"五\",\"Color\":\"Green\",\"Background\":\"\",\"Bold\":true,\"Underlined\":false,\"Blinking\":false,\"Inverse\":false},{\"Text\":\"行\",\"Color\":\"Green\",\"Background\":\"\",\"Bold\":true,\"Underlined\":false,\"Blinking\":false,\"Inverse\":false},{\"Text\":\"洞\",\"Color\":\"Green\",\"Background\":\"\",\"Bold\":true,\"Underlined\":false,\"Blinking\":false,\"Inverse\":false}]":"s"
    }
    let Maze = function (param) {
        basicmaze.call(this, param)
        this.ID = "少林寺五行洞"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped = function (move) {
        if (!App.Data.Room.Name){
            return false
        }
        return App.Data.Room.Name=="暗道"&&App.HasRoomExit("up")
    }
    Maze.prototype.Explore = function (move) {
        let dir=namedumps[App.Data.Room.NameDump]
        App.Go(dir?dir:"s")
    }
    Maze.prototype.Init=function(){
    }

    return Maze

})(App)