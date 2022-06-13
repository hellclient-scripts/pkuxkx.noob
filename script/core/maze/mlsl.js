(function (App) {
    let basicmaze=Include("include/maze.js")
    let Maze=function(param){
        basicmaze.call(this,param)
        this.ID="苗岭山林"
    }
    let exitsw=["wu","w","wd"]
    let exitse=["eu","e","ed"]
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.IsEscaped=function(move){
        return App.Data.Room.Name!="苗岭山林"
    }
    Maze.prototype.Explore=function(move){
        let dir=(this.Current=="西")?exitsw:exitse
        if (App.HasRoomExit("out")){
            App.Go("out")
            return 
        }
        App.Go(RandomList(dir))
    }
    Maze.prototype.OnStateEvent=function(move,state,event,data){
        switch (event){
            case "move.notallowed":
                let dir=(this.Current=="西")?exitsw:exitse
                let exit=RandomList(dir)
                world.DoAfterSpecial(1, 'App.Go("'+exit+'")', 12);
                return true
                break;
        }
        return false
    }
    return Maze
})(App)