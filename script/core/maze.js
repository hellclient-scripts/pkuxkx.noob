
(function(App){
    App.Core.Maze={}
    App.Core.Maze.Mazes={}
    App.Core.Maze.Info={}
    let re=/^(\S*)(\s+(.*)){0,1}$/
    App.Core.Maze.Last=""
    App.Core.Maze.LoadMaze=function(cmd){
        let last=App.Core.Maze.Last
        App.Core.Maze.Last=cmd
        if (!cmd){
            return null
        }
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
        if (last!=cmd){
            maze.Init()
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
    App.RegisterMaze(new (Include("core/maze/wdml.js"))())
    App.RegisterMaze(new (Include("core/maze/wdxs.js"))())
    App.RegisterMaze(new (Include("core/maze/gbmd.js"))())
    App.RegisterMaze(new (Include("core/maze/mlsl.js"))())
    App.RegisterMaze(new (Include("core/maze/mjds.js"))())
    App.RegisterMaze(new (Include("core/maze/wssz.js"))())
    App.RegisterMaze(new (Include("core/maze/wdtfin.js"))())
    App.RegisterMaze(new (Include("core/maze/wdtfout.js"))())
    App.RegisterMaze(new (Include("core/maze/mountain.js"))())
    App.RegisterMaze(new (Include("core/maze/wls.js"))())
})(App)
    