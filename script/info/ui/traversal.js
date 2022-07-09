(function(App){
    App.InfoUITraversalRemain=function() {
            App.LastMove.WithData(App.NewGoal().FindKnownRoom()).Continue()        
    }
    App.InfoUITraversal=function() {
        var list=Userinput.newlist("请选自你要做的处理","你的遍历操作是？")
        list.append("new","新建遍历")
        if (App.LastMove&&App.LastMove.Context.Remain){
            list.append("finish","结束遍历")
            list.append("continue","继续遍历")
        }
        list.publish("App.InfoUITraversalStart")
    }
    App.InfoUITraversalStart=function(name,id,code,data) {
        if (code==0 && data){

            switch(data){
                case "new":
                    App.Traversal();
                break 
                case "finish":
                    App.LastMove.WithData(App.NewGoal().FindKnownRoom()).Continue();
                break 
                case "continue":
                    let data=App.LastMove.Data
                    data.Found=false
                    App.LastMove.WithData(data).Continue();
                break
            }
        }
}
    App.RegisterAssistant("traversal","遍历",App.InfoUITraversal,50)

})(App)