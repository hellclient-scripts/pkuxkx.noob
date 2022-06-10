(function (App) {
    let basicmaze=Include("include/maze.js")
    let Maze=function(){
        basicmaze.call(this)
        this.ID="武当密林向北"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped=function(move){
        return App.Data.Room.Name=="石阶"
    }
    Maze.prototype.Explore=function(move){
        if (App.HasRoomExit("northup")){
            App.Go("northup")
            return 
        }
        let exit=RandomList(App.Data.Room.Exits.filter(function(e) { return e !=='southdown'}))
        App.Go(exit)
    }
    return Maze
})(App)