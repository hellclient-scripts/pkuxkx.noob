(function (App) {
    let basicmaze=Include("include/maze.js")
    let Maze=function(){
        basicmaze.call(this)
        this.ID="徐州骆马湖"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped=function(move){
        if (App.Data.Room.Name=="木桩上"){
            return false
        }
        return true
    }
    let dirmap={
        "↖":"nw",
        "↗":"ne",
        "↘":"se",
        "↙":"sw",
    }
    Maze.prototype.Next=function(){
        let lines=App.Core.RoomLines.DescLines
        let dir="up"
        for (var i=0;i<lines.length;i++){
            let line=lines[i]
            for( k=0;k<line.Words.length;k++){
                let word=line.Words[k]
                if (word.Color=="Yellow"){
                    let d=word.Text.trim()
                    if (dirmap[d]){
                        dir=dirmap[d]
                    }
                }
            }
        }
        App.Send("step "+dir)
        App.Next()
    }
    Maze.prototype.Explore=function(move){
        let snap=App.Core.Snapshot.Take()
        App.Commands([
            App.NewCommand("nobusy"),
            App.NewCommand("function",this.Next),
            App.NewCommand("nobusy"),
            App.NewCommand("do","l"),

            App.NewCommand("function",function(){
                App.Core.Snapshot.Rollback(snap)
            })
        ]).Push()
        App.Next()
    }
    Maze.prototype.Init=function(){
        App.Send("l")
    }

    return Maze
})(App)