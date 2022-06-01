(function(App){
    App.InfoUIToShowList=function() {
        var list=Userinput.newlist("请选择你的目标","选择你要前往的目标,可以进行模糊搜索",true)

        for (var key in App.Info.Rooms) {
            var loc=App.Info.Rooms[key]
            list.append(loc.ID,loc.Name+"("+loc.ID+") "+(loc.Desc?loc.Desc:"")+" ROOM")
        }
        list.publish("App.InfoUITo")
    }
    App.InfoUITo=function(name,id,code,data) {
        if (code==0 && data){
            App.ExecuteTask("queue","#to "+data)
        }
    }
    App.RegisterAssistant("to","前往地点",App.InfoUIToShowList,10)
})(App)