(function (App) {
    let Random=Include("core/maze/random.js")
    let Maze=function(param){
        Random.call(this,param)
        this.ID="武当土匪进入"
        this.IgnoreArrived=true
    }
    Maze.prototype = Object.create(Random.prototype)
    Maze.prototype.CheckSuccess=function(){
        return App.Data.Room.Name=="竹楼"
    }
    let filter={
        "eastup":true,
        "westup":true,
        "northup":true,
        "southup":true,
        "out":true,
    }
    Maze.prototype.EntryCmd=function(){
        return "enter"
    }
    Maze.prototype.GetExits=function(){
        if (App.HasRoomExit("enter")){
            return["enter"]
        }
        return App.Data.Room.Exits.filter(function(e) { return !filter[e]})
    }
    return Maze
})(App)
