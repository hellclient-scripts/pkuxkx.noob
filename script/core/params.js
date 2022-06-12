
(function(App){
    App.Core.Params={}
    App.GetParamWaitCmd=function(){
        return world.GetVariable("wait_cmd")
    }
    App.GetParamHome=function(){
        return world.GetVariable("home")
    }
    App.GetSafeRoom=function(){
        room=world.GetVariable("saferoom")
        if (room){
            return room
        }
        return world.GetVariable("home")?App.Info.RoomHome:App.Info.RoomSafe
    }
})(App)