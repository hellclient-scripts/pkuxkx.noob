(function (App) {
    let Random=Include("core/maze/random.js")
    let Maze=function(param){
        Random.call(this,param)
        this.ID="武当土匪离开"
    }
    Maze.prototype = Object.create(Random.prototype)
    Maze.prototype.CheckSuccess=function(){
        return App.Data.Room.Name=="林中小路"
    }
    let filter=["eastup","westup","northup","southup"]
    Maze.prototype.EntryCmd=function(){
        return App.Data.Room.Exits[0]
    }
    Maze.prototype.GetExits=function(){
        for (var i=0;i<filter.length;i++){
            if (App.HasRoomExit(filter[i])){
                return[filter[i]]
            }
        }
        return App.Data.Room.Exits.filter(function(e) { return e!="out"})
    }
    return Maze
})(App)
