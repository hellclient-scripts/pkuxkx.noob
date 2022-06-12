
(function(App){
    App.Core.Params={}
    App.GetParamWaitCmd=function(){
        return world.GetVariable("wait_cmd")
    }
    App.GetParamHome=function(){
        return world.GetVariable("home")
    }
    App.GetSleepRooms=function(){
        let rooms=[(world.GetVariable("home")?App.Info.RoomHome:App.Info.RoomSafe)]
        rooms=rooms.concat(App.Info.SleepRooms)
        return rooms
    }
    App.GetSafeRoom=function(){
        let room=world.GetVariable("saferoom")
        if (room){
            return room
        }
        return world.GetVariable("home")?App.Info.RoomHome:App.Info.RoomSafe
    }
    App.GetParamNeiliMin=function(){
        return world.GetVariable("neili_min")
    }
})(App)