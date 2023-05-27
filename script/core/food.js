
(function(App){
    let check=Include("core/check/check.js")
    App.Data.LastEat=0
    App.GetFood=function(){
        return App.API.GetItem(App.GetParam("food"))
    }
    App.GetDrink=function(){
        return App.API.GetItem(App.GetParam("drink"))
    }
    App.EatCmd=function(){
        return "eat "+App.GetFood().Alias+";drink "+App.GetDrink().Alias
    }
    App.Eat=function(force){
        App.Core.Neili.Exec()
        checkFood.Execute(force)
        // App.Data.LastEat=Now()
        // App.Send(App.EatCmd())
        // App.Send(App.EatCmd())
        // App.Send(App.EatCmd())
    }
    App.Bind("Check","core.food.eat")
    let checkFood=(new check("food")).WithLevel(App.CheckLevelBrief).WithIntervalParam("eatinterval").WithLastID("LastEat")
    checkFood.Send=function(){
        App.Send(App.EatCmd())
        App.Send(App.EatCmd())
        App.Send(App.EatCmd())
    }
    App.RegisterCallback("core.food.eat",checkFood.Callback())
    })(App)