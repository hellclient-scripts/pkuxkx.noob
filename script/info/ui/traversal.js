(function(App){
    App.InfoUITraversalRemain=function() {
            App.LastMove.WithData(App.NewGoal()).Continue()        
    }
    App.InfoUITraversal=function() {
            App.Traversal()
    }
    App.RegisterAssistant("traversal","遍历",App.InfoUITraversal,2)
    App.RegisterAssistant("traversalremain","继续遍历",App.InfoUITraversalRemain,3)

})(App)