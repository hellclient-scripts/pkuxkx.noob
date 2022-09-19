(function(App){
    App.Quest.Queue={}
    App.Quest.Queue.Start=function(){
        let queue=GetVariable("queue").trim()
        if (queue){
            App.ExecuteTask("queue",queue)
        }else{
            App.Next()
        }
    }
    })(App)