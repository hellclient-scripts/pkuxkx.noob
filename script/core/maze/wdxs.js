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
        let current=App.Automaton.Current()
        App.Push(["core.state.maze.wdxs"]).WithData("Automaton",current)
        App.Next()
    }
    App.RegisterState(new (Include("core/state/maze/wdxs/wdxs.js"))())
    return Maze
})(App)