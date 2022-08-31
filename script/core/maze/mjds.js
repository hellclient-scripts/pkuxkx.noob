(function (App) {
    let Random=Include("core/maze/random.js")
    let Maze=function(param){
        Random.call(this,param)
        this.ID="苗岭大山"
    }
    Maze.prototype = Object.create(Random.prototype)
    Maze.prototype.CheckSuccess=function(){
        let info=App.Info.RoomFull()
        let data=SplitN(this.Current,".",2)  
        return info==data[1]      
    }
    Maze.prototype.CheckWrongway=function(){
        return App.Data.Room.Tags.indexOf("[门派]")>-1
    }
    return Maze
})(App)
