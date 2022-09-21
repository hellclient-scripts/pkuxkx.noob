(function (App) {
    let basicmaze=Include("include/maze.js")
    let Maze=function(){
        basicmaze.call(this)
        this.ID="丐帮密道"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped=function(move){
        if (App.Data.Room.Name=="树洞内部"||App.Data.Room.Name=="树洞下"){
            return false
        }
        return true
    }
    Maze.prototype.Explore=function(move){
            App.Go(this.Current)
    }
    Maze.prototype.OnStateEvent=function(move,state,event,data){
        switch (event){
            case "move.onRoomObjEnd":
                switch (App.Data.Room.Name){
                    case "树洞内部":
                        let snap=App.Core.Snapshot.Take()
                        App.Commands([
                            App.NewCommand("move",App.Options.NewPath("d")),
                            App.NewCommand("function",function(){
                                App.Core.Snapshot.Rollback(snap)
                            }),
                        ]).Push()
                    App.Next()
                    return true
                    case "树洞下":
                        return false
                    break
                    default:
                        return true
                }
                break;
        }
    }
    return Maze
})(App)