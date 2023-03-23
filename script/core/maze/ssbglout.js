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
    Maze.prototype.Next=function(){
        App.NeedRoomDesc()
        if (App.Data.Room.Name == "大道"){
            App.Go("s")
            App.Next()
            return
        }
        App.Go("e")
        App.Next()
    }
    Maze.prototype.Explore = function (move) {
        App.Data.NeedRoomDesc=false
        let snap=App.Core.Snapshot.Take()
        App.Commands([
            App.NewCommand("delay",1),
            App.NewCommand("do","l s"),
            App.NewCommand("nobusy"),
            App.NewCommand("function",this.Next),
            App.NewCommand("function",function(){
                App.Core.Snapshot.Rollback(snap)
            })
        ]).Push()
        App.Next()
    }
    return Maze
})(App)