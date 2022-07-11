(function (App) {
    let Random=Include("core/maze/random.js")
    let Rooms={
        "熔岩滴丘":true,
        "火山口湖":true,
        "火山口":true,
        "侵蚀火山口":true,
        "温泉":true,
        "山丘":true,
        "熔岩坑":true,
        "颈丘":true,        
    }
    let Maze=function(param){
        Random.call(this,param)
        this.ID="大石谷"
    }
    Maze.prototype = Object.create(Random.prototype)
    Maze.prototype.CheckSuccess=function(){
        let info=App.Info.RoomFull()
        let data=SplitN(this.Current,">",2)  
        return info==data[1]      
    }
    Maze.prototype.CheckWrongway=function(){
        return !Rooms[App.Data.Room.Name]
    }
    return Maze
})(App)
