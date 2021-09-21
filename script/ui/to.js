(function(app){
    app.UIToShowList=function() {
        var list=Userinput.newlist("请选择你的目标","选择你要前往的目标,可以进行模糊搜索",true)

        for (var key in app.Info.Rooms) {
            var loc=app.Info.Rooms[key]
            list.append(loc.ID,loc.Name+"("+loc.ID+") "+(loc.Desc?loc.Desc:"")+" ROOM")
        }
        list.send("App.UITo")
    }
    app.UITo=function(name,id,code,data) {
        if (code==0 && data){
            app.ExecuteTask("queue","#to "+data)
        }
    }
})(App)