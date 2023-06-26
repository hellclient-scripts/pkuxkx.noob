(function (App) {
    let basicmaze=Include("include/maze.js")
    let Maze=function(){
        basicmaze.call(this)
        this.ID="明教密室"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped=function(move){
        if (App.Data.Room.Name=="后花园"){
            return false
        }
        return true
    }
    let Question1=App.Options.NewQuestion("xiao zhao","张无忌")
    let Question2=App.Options.NewQuestion("xiao zhao","乾坤大挪移")
    let Question3=App.Options.NewQuestion("xiao zhao","密室")
    Maze.prototype.Explore=function(move){
        let snap=App.Core.Snapshot.Take()
        App.Commands([
            App.NewCommand("ask",Question1),
            App.NewCommand("ask",Question2),
            App.NewCommand("ask",Question3),
            App.NewCommand("function",function(){
                App.Core.Snapshot.Rollback(snap)
            })
        ]).Push()
        App.Next()
    }
    return Maze
})(App)