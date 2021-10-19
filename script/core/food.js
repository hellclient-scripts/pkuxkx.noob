
(function(app){
    let check=Include("core/check/check.js")
    app.Data.LastEat=0
    app.GetFood=function(){
        return App.API.GetItem(app.GetParam("food"))
    }
    app.GetDrink=function(){
        return App.API.GetItem(app.GetParam("drink"))
    }
    app.EatCmd=function(){
        return "eat "+app.GetFood().Alias+";drink "+app.GetDrink().Alias
    }
    app.Eat=function(){
        app.Data.LastEat=Now()
        app.Send(app.EatCmd())
    }
    app.Bind("Check","core.food.eat")
    let checkFood=(new check("food")).WithLevel(app.CheckLevelBrief).WithIntervalParam("eatinterval").WithLastID("LastEat")
    checkFood.Send=function(){
        app.Eat()
    }
    app.RegisterCallback("core.food.eat",checkFood.Callback())
    })(App)