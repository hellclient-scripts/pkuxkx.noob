(function (App) {
    const maxlevel=200
    var Backward=Include("include/backward.js")
    var MazeBackward={...Backward}
    MazeBackward["xiaojing"]="xiaojing"
    MazeBackward["biandao"]="biandao"
    let DFS=new(Include("include/dfs.js"))(maxlevel,MazeBackward)
    let basicmaze=Include("include/maze.js")
    let Maze=function(param){
        basicmaze.call(this,param)
        this.ID="Random"
        this.Finished=false
        this.Arrived={}
        this.Command=null
        this.Start=""
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
    }
    Maze.prototype.IsEscaped=function(move){
        let escaped=(this.CheckSuccess()&&this.Command)
        return escaped
    }
    Maze.prototype.Explore=function(move){
        let data=SplitN(this.Current,">",2)
        if (this.Command==null){
                this.Start=App.Info.RoomFull()
                App.Send("set brief 1")
                this.Command=DFS.New()
                let level=this.Command.Arrive([data[0]])
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
    Maze.prototype.OnStateEvent=function(move,state,event,data){
        switch (event){
            case "move.onRoomObjEnd":
                if (this.Command==null){
                    break
                }
                let info=App.Info.RoomFull()
                let giveup=this.Arrived[info+App.Core.RoomDesc.Map]||this.CheckWrongway()
                if (this.CheckWrongway() && info!=this.Start){
                    let to=this.Command.Level.Concat()
                    to.push(this.Command.Command)
                    App.Core.Maze.Info[this.Start+"-"+info]=(to.join(";"))
                    let fr=this.Command.Level.ConcatBackward()
                    fr.unshift(MazeBackward[this.Command.Command])
                    App.Core.Maze.Info[info + "-" +this.Start]=(fr.join(";"))
                }
                let level=this.Command.Arrive(giveup?[]:App.Data.Room.Exits)
                if (level==null){
                   App.Fail()
                    return 
                }
                this.Arrived[info+App.Core.RoomDesc.Map]=true
                this.Command=level.Next()
                break;
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
