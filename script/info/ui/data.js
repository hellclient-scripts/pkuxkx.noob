(function(app){
    app.InfoUIDataShowList=function() {
        var list=Userinput.newlist("请选择你要管理的数据","请选择你要管理的数据")
        list.append("builtinrooms","内建房间信息(只读)")
        list.append("userrooms","用户房间信息")
        list.append("builtinpaths","内建路径信息(只读)")
        list.append("userpaths","用户路径信息")

        list.send("App.InfoUIData")
    }
    app.InfoUIData=function(name,id,code,data) {
        if (code==0 && data){
            app.ExecuteTask("queue","#to "+data)
        }
    }
    app.RegisterAssistant("data","数据管理",app.InfoUIDataShowList,50)

})(App)