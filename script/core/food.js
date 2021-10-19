
(function(app){
    let check=Include("core/check/check.js")
    app.Data.LastEat=0
    app.EatCmd=function(){
        return "eat "+app.GetParam("food")+";drink "+app.GetParam("drink")
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