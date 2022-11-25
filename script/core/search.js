(function(App){
    App.Core.Search={}
    App.Data.Search={}
    App.Core.Search.Blacklist={
        "苗岭边缘":{"enter":true},
        "山间小路":{"enter":true},
    }
    App.Core.Search.GetReturns=function(){
        let move=App.Core.Search.LastMove
        if (move==null||move.Context==null||move.Context.Level==null){
            return []
        }
        return move.Context.ConcatBackward()
    }
    App.Core.Search.For=function(id,depth){
        let goal=App.NewGoal(id).FindObjID()
        App.Core.Search.Start(goal,depth)

    }
    App.Core.Search.Locate=function(depth){
        App.Commands([
            App.NewCommand("do","l;place"),
            App.NewCommand("nobusy"),
            App.NewCommand("function",function(){
                if (App.Data.Room.ID){
                    App.Next()
                }else{
                    App.Core.Search.LocateSearch(depth)
                }
            }),
        ]).Push()
        App.Next()
    }
    App.Core.Search.LocateSearch=function(depth){
        let goal=App.NewGoal("").FindKnownRoom()
        App.Core.Search.Start(goal,depth)
    }
    App.Core.Search.New = function () {
        App.Data.Search={
            Depth:1,
            Goal:null,
        }
    }
    App.Core.Search.Start=function(goal,depth){
        App.Core.Search.New()
        App.Data.Search.Goal=goal
        App.Data.Search.Depth=depth?depth:1
        App.NewCommand("search",App.Options.NewSearch(App.Data.Search.Goal,App.Data.Search.Depth)).Push()
        App.Next()
    }
    App.Core.Search.LastMove=null

})(App)