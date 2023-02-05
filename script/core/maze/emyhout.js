(function (App) {
    let basicmaze = Include("include/maze.js")
    let Maze = function (param) {
        basicmaze.call(this, param)
        this.ID = "峨嵋云海返回"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped = function (move) {
        return App.Data.Room.Name != "云海"
    }
    Maze.prototype.Explore = function (move) {
        App.NeedRoomDesc()
        if (App.Info.RoomDesc().indexOf("有一条小道通向前方")>-1){
            App.Go("n")
            return
        }
        App.Go("s")
    }
    Maze.prototype.Init=function(){
        App.NeedRoomDesc()
        // App.Send("unset brief")
    }
    return Maze

})(App)