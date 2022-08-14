(function (App) {
    let basicmaze = Include("include/maze.js")
    let Maze = function (param) {
        basicmaze.call(this, param)
        this.ID = "神龙岛密道"
    }
    Maze.prototype = Object.create(basicmaze.prototype)
    Maze.prototype.Online=function(line){
        if (line=="你握住照明灯用力一按，只听到墙壁发出沉重的声音，墙上开了一个小门。"){
            App.SetRoomData("sldmd",true)
        }
    }

    Maze.prototype.IsEscaped = function (move) {
        return App.Data.Room.Name != "内堂"
    }
    Maze.prototype.Explore = function (move) {
        App.SetRoomData("sldmd",false)
        App.SetRoomOnline(this.Online)
        App.Send("l light;push light")
        App.Core.CheckBusy()
    }
    Maze.prototype.OnStateEvent=function(move,state,event,data){
        switch (event){
            case "busy":
            case "nobusy":
                if(App.GetRoomData("sldmd")){
                    App.Go("n")
                }else{
                    App.Send("l light;push light")
                    App.Core.CheckBusy()
                    }
                return true
        }
        return false
    }
    return Maze
})(App)