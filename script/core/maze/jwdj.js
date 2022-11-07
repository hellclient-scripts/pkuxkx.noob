(function (App) {
    let basicmaze=Include("include/maze.js")
    let Maze=function(){
        basicmaze.call(this)
        this.ID="进五毒教"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped=function(move){
        if (App.Data.Room.Name!="山中密道"){
            return false
        }
        return true
    }
    Maze.prototype.Explore=function(move){
            App.Go("cuo shitou;s")
    }
    Maze.prototype.OnStateEvent=function(move,state,event,data){
        switch (event){
            case "move.notallowed":
                let snap=App.Core.Snapshot.Take("move.retry")
                App.Commands([
                    App.NewCommand("move",App.Options.NewPath("out;n;e")),
                    App.NewCommand("do","get shitou"),
                    App.NewCommand("move",App.Options.NewPath("w;s;l 山壁&&enter")),
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