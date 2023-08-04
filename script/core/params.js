
(function(App){
    App.Core.Params={}
    App.GetParamWaitCmd=function(){
        return world.GetVariable("wait_cmd")
    }
    App.GetParamHome=function(){
        return world.GetVariable("home")
    }
    App.GetParamBangpai=function(){
        return world.GetVariable("bangpai")
    }
    App.GetSleepRooms=function(){
        let rooms=[(world.GetVariable("home")?App.Info.RoomHome:App.Info.RoomSafe)]
        rooms=rooms.concat(App.Info.SleepRooms)
        return rooms
    }
    App.GetSafeRoom=function(){
        let room=world.GetVariable("safe_room")
        if (room){
            return room
        }
        return world.GetVariable("home")?App.Info.RoomHome:App.Info.RoomSafe
    }
    App.GetParamGoldMin=function(){
        let v=world.GetVariable("gold_min")
        return v?(v-0):App.Core.ShoppingMode.Current().GoldMin()
    }
    App.GetParamGoldMax=function(){
        let v=world.GetVariable("gold_max")-0
        if (v){
            return v
        }else{
            return (3*App.GetParamGoldMin()+5)
        }

    }
    App.SetVariable=function(key,value){
        world.SetVariable(key,value)
        Userinput.Popup("", "设置修改", "设置修改已生效，记得保存游戏")
    }

    App.RegisterCallback("core.params.walktags",function(){
        let data=world.GetVariable("walk_tags").split("\n")
        for (var i=0;i<data.length;i++){
            var tag=data[i].trim()
            if (tag){
                Mapper.settag(tag,true)
            }
        }

    })
    App.Bind("PathInit", "core.params.walktags")

})(App)