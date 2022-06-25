(function (App) {
    let basicmaze=Include("include/maze.js")
    let Maze=function(){
        basicmaze.call(this)
        this.ID="武当下山"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped=function(move){
        if (App.Data.Room.Name!="紫霄宫"){
            return false
        }
        return true
    }
    Maze.prototype.Explore=function(move){
            App.Go("sd")
    }
    Maze.prototype.OnStateEvent=function(move,state,event,data){
        switch (event){
            case "move.notallowed":
                let snap=App.Core.Snapshot.Take("move.retry")
                App.Commands([
                    App.NewCommand("move",App.Options.NewPath("n")),
                    App.NewCommand("do","ask song yuanqiao about 下山"),
                    App.NewCommand("move",App.Options.NewPath("s")),
                    App.NewCommand("function",function(){
                        App.Core.Snapshot.Rollback(snap)
                    }),
                ]).Push()
                App.Next()
                return true
                break;
        }
        return false
    }
    return Maze
})(App)