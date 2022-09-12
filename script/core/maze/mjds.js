(function (App) {
    let Random=Include("core/maze/random.js")
    let Rooms={
        "陡坡":true,
        "悬崖":true,
        "缓坡":true,
        "峭壁":true,
        "山腰":true,
        "山路":true,
        "山坡":true,
        "巨岩":true,
        "荒地":true,
        "枯藤":true,
        "瀑布":true,
        "山间平台":true,
        "一线天":true,
        "山脊":true,
        "泉眼":true,     
    }
    let Maze=function(param){
        Random.call(this,param)
        this.ID="苗岭大山"
    }
    Maze.prototype = Object.create(Random.prototype)
    Maze.prototype.CheckSuccess=function(){
        let info=App.Info.RoomFull()
        let data=SplitN(this.Current,".",2)  
        return info==data[1]      
    }
    Maze.prototype.CheckWrongway=function(){
        return !Rooms[App.Data.Room.Name]
    }
    return Maze
})(App)
