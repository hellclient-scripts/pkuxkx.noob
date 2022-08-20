(function (App) {
    const maxlevel=200
    var Backward=Include("include/backward.js")
    var MazeBackward={...Backward}
    MazeBackward["xiaojing"]="xiaojing"
    MazeBackward["biandao"]="biandao"
    let DFS=Include("include/dfs.js")
    let basicmaze=Include("include/maze.js")
    let Maze=function(param){
        basicmaze.call(this,param)
        this.ID="Random"
        this.Finished=false
        this.Arrived={}
        this.Command=null
        this.Start=""
        this.IgnoreArrived=false
        this.MaxDepth=maxlevel
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.CheckSuccess=function(){
        //必须实现这个接口，判断是否成功
        // let info=App.Info.RoomFull()
        // let data=SplitN(this.Current,">",2)  
        // return info==data[1]      
    }
    Maze.prototype.CheckWrongway=function(){
        //必须实现这个接口，判断是否走到了预期外的地点需要返回
        //return App.Data.Room.Tags=="[门派] [存盘点]"
        return false
    }
    Maze.prototype.EntryCmd=function(){
        let data=SplitN(this.Current,">",2)
        return data[0]
    }
    Maze.prototype.IsEscaped=function(move){
        let escaped=(this.CheckSuccess()&&this.Command)
        return escaped
    }
    Maze.prototype.Explore=function(move){
        if (this.Command==null){
                this.Start=App.Info.RoomFull()
                App.Send("unset brief")
                this.Command=(new DFS(this.MaxDepth,MazeBackward)).New()
                let entrycmd=this.EntryCmd()
                if (typeof(entrycmd)=="string"){
                    entrycmd=[entrycmd]
                }
                let level=this.Command.Arrive(entrycmd)
                this.Command=level.Next()
                App.Go(this.Command.Command)
                return;
        }
        if (this.Command){
            App.Go(this.Command.Command)
        }else{
            App.Fail()
        }
    }
    Maze.prototype.GetExits=function(){
        return App.Data.Room.Exits
    }
    Maze.prototype.OnStateEvent=function(move,state,event,data){
        switch (event){
            case "move.onRoomObjEnd":
                if (this.Command==null){
                    break
                }
                let info=App.Info.RoomFull()
                let giveup=this.Arrived[info+App.Core.RoomDesc.Map+App.Info.RoomDesc()]||this.CheckWrongway()
                if (this.CheckWrongway() && info!=this.Start){
                    let to=this.Command.Level.Concat()
                    to.push(this.Command.Command)
                    App.Core.Maze.Info[this.Start+"-"+info]=(to.join(";"))
                    let fr=this.Command.Level.ConcatBackward()
                    fr.unshift(MazeBackward[this.Command.Command])
                    App.Core.Maze.Info[info + "-" +this.Start]=(fr.join(";"))
                }
                let level=this.Command.Arrive(giveup?[]:this.GetExits())
                if (level==null){
                   App.Fail()
                    return 
                }
                if (!this.IgnoreArrived){
                    this.Arrived[info+App.Core.RoomDesc.Map+App.Info.RoomDesc()]=true
                }
                this.Command=level.Next()
                break;
                case "core.bufffull":
                    if (this.Command==null){
                        break
                    }
                    world.DoAfterSpecial(App.Vehicle.RetryInterval, 'App.Go("'+this.Command.Command+'")', 12);
                    
                break
        }
        return false
    }
    Maze.prototype.Init=function(){
        App.Data.Room.ID=""
        this.Finished=false
        this.Arrived={}
        this.Command=null
    }
    return Maze
})(App)
