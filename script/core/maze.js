
(function(App){
    App.Core.Maze={}
    App.Core.Maze.Mazes={}
    App.Core.Maze.LoadMaze=function(cmd){
        if (cmd.slice(0,6)!="#maze "){
            return null
        }
        let id=cmd.slice(6)
        if (id==""){
            throw "Maze id不可为空"
        }
        let maze=App.Core.Maze.Mazes[id]
        if (maze==undefined){
            throw "Maze id["+id+"]未注册"
        }
        return maze
    }
    App.RegisterMaze=function(maze){
        let id=maze.ID
        if (!id){
            throw "Maze id不可为空"
        }
        App.Core.Maze.Mazes[id]=maze
    }
    App.RegisterMaze(new (Include("core/maze/wdmln.js"))())
    App.RegisterMaze(new (Include("core/maze/wdmls.js"))())
    })(App)