
(function(App){
    App.Core.Maze={}
    App.Core.Maze.Mazes={}
    let re=/^(\S*)(\s+(.*)){0,1}$/
    App.Core.Maze.LoadMaze=function(cmd){
        if (cmd.slice(0,6)!="#maze "){
            return null
        }
        let data=cmd.slice(6).match(re)
        
        let id=data[1]
        if (id==""){
            throw "Maze id不可为空"
        }
        let maze=App.Core.Maze.Mazes[id]
        if (maze==undefined){
            throw "Maze id["+id+"]未注册"
        }
        maze.Current=data[3]
        return maze
    }
    App.RegisterMaze=function(maze){
        let id=maze.ID
        if (!id){
            throw "Maze id不可为空"
        }
        App.Core.Maze.Mazes[id]=maze
    }
    App.RegisterMaze(new (Include("core/maze/wdml.js"))())
    App.RegisterMaze(new (Include("core/maze/wdxs.js"))())
    App.RegisterMaze(new (Include("core/maze/gbmd.js"))())
    App.RegisterMaze(new (Include("core/maze/mlsl.js"))())
    
    })(App)