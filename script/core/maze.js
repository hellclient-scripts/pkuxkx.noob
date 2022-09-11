
(function(App){
    App.Core.Maze={}
    App.Core.Maze.Mazes={}
    App.Core.Maze.Data={}
    App.Core.Maze.Info={}
    let re=/^(\S*)(\s+(.*)){0,1}$/
    App.Core.Maze.SetLast=function(last){
        if (App.LastMove){
            App.LastMove.LastMaze=last
        }
    }
    App.Core.Maze.InMaze=function(){
        return App.Core.Maze.GetLast().startsWith("#maze ")
    }
    App.Core.Maze.GetLast=function(){
        return App.LastMove?App.LastMove.LastMaze:""
    }
    
    App.Core.Maze.LoadMaze=function(cmd){
        let last=App.Core.Maze.GetLast()
        App.Core.Maze.SetLast(cmd)
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
    App.RegisterMaze(new (Include("core/maze/dsg.js"))())
    App.RegisterMaze(new (Include("core/maze/ssbglout.js"))())    
    App.RegisterMaze(new (Include("core/maze/wls.js"))())
    App.RegisterMaze(new (Include("core/maze/wlsdsb.js"))())
    App.RegisterMaze(new (Include("core/maze/sld.js"))())
    App.RegisterMaze(new (Include("core/maze/hztdhfy.js"))())
    App.RegisterMaze(new (Include("core/maze/emyhout.js"))())
    App.RegisterMaze(new (Include("core/maze/sldsl.js"))())
    App.RegisterMaze(new (Include("core/maze/sldmd.js"))())
})(App)
    