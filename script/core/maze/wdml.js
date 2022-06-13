(function (App) {
    let basicmaze=Include("include/maze.js")
    let Maze=function(param){
        basicmaze.call(this,param)
        this.ID="武当密林"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped=function(move){
        return App.Data.Room.Name=="石阶"
    }
    Maze.prototype.Explore=function(move){
        let dir=(this.Current=="北")?"northup":"southdown"
        let back=(this.Current=="北")?"southdown":"northup"
        if (App.HasRoomExit(dir)){
            App.Go(dir)
            return 
        }
        let exit=RandomList(App.Data.Room.Exits.filter(function(e) { return e !==back}))
        App.Go(exit)
    }
    return Maze
})(App)