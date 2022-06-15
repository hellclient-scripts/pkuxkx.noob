(function (App) {
    let Random=Include("core/maze/random.js")
    let Maze=function(param){
        Random.call(this,param)
        this.ID="万兽山庄"
    }
    Maze.prototype = Object.create(Random.prototype)
    Maze.prototype.CheckSuccess=function(){
        let info=App.Info.RoomFull()
        let data=SplitN(this.Current,">",2)  
        return info==data[1]      
    }
    Maze.prototype.CheckWrongway=function(){
        return App.Data.Room.Name=="林间道"
    }
    return Maze
})(App)
