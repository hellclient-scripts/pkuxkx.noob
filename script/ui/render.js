(function (App) {
    App.UIRender={}
    App.UIRender.OnTicker=function(){
       App.Raise("ui.render.ticker") 
    }
})(App)