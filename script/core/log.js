(function (App) {
    App.Log=function(type,data){
        let d=new Date()
        world.WriteLog(d.toLocaleString()+" "+type+" "+data)
    }
})(App)
