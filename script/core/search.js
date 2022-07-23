(function(App){
    App.Core.Search={}
    App.Data.Search={}
    App.Core.Search.Locate=function(depth){
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