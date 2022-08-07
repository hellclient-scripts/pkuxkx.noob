(function (App) {
    let basicmaze = Include("include/maze.js")
    App.Core.Maze.Data.hztdhfy={}
    let Maze = function (param) {
        basicmaze.call(this, param)
        this.ID = "杭州提督府花园"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped = function (move) {
        return App.Data.Room.Name != "花园"
    }
    Maze.prototype.Next=function(){
        if (App.Core.Maze.Data.hztdhfy.huacong){
            App.Go(App.Core.Maze.Data.hztdhfy.huacong)
        }else{
            App.Go(RandomList(App.Core.Maze.Data.hztdhfy.safe))
        }
        App.Next()
    }
    Maze.prototype.Look=function(direct){
        App.Send("l "+App.Core.Maze.Data.hztdhfy.queue[0])
        App.Next()
    }
    Maze.prototype.Record=function(){
        let dir=App.Core.Maze.Data.hztdhfy.queue.shift()
        if (App.Core.RoomDesc.Desc.indexOf("huacong")>-1){
            App.Core.Maze.Data.hztdhfy.huacong=dir
        }else if(App.Core.RoomDesc.Desc.indexOf("有一股让人觉得很危险的气息")<0){
            App.Core.Maze.Data.hztdhfy.safe.push(dir)    
        }
        App.Next()
    }
    Maze.prototype.Explore = function (move) {
        if (App.Core.RoomDesc.Desc.indexOf("huacong")>-1){
            App.Send("bo huacong")
            App.Go("enter")
            return
        }
        App.Core.Maze.Data.hztdhfy={
            huacong:"",
            queue:["n","e","s","w"],
            safe:[],
        }
        let snap=App.Core.Snapshot.Take()
        App.Commands([
            App.NewCommand("delay",1),
            App.NewCommand("function",this.Look),
            App.NewCommand("nobusy"),
            App.NewCommand("function",this.Record),
            App.NewCommand("delay",1),
            App.NewCommand("function",this.Look),
            App.NewCommand("nobusy"),
            App.NewCommand("function",this.Record),
            App.NewCommand("delay",1),
            App.NewCommand("function",this.Look),
            App.NewCommand("nobusy"),
            App.NewCommand("function",this.Record),
            App.NewCommand("delay",1),
            App.NewCommand("function",this.Look),
            App.NewCommand("nobusy"),
            App.NewCommand("function",this.Record),
            App.NewCommand("function",this.Next),
            App.NewCommand("function",function(){
                App.Core.Snapshot.Rollback(snap)
            })
        ]).Push()
        App.Next()
    }
    return Maze
})(App)