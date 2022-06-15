(function(){
    let Maze=function(){
        this.ID=""
        this.Current=""
    }
    Maze.prototype.IsEscaped=function(move){
        return false
    }
    Maze.prototype.Explore=function(move){
    }
    Maze.prototype.Init=function(){
    }
    Maze.prototype.Leave=function(){
        App.Core.Maze.Last=""
    }
    Maze.prototype.OnStateEvent=function(move,state,event,data){
        return false
    }
    return Maze
})()