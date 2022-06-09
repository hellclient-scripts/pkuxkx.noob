(function(App){
    let Walk=function(path,goal,vehicle){
        this.Path=App.API.ConvertPath(path)
        this.Goal=goal
        this.Vehicle=vehicle?vehicle:""
    }
    return Walk
})(App)