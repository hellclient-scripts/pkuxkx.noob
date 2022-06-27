(function(App){
    let Find=function(path,goal,target,vehicle){
        this.Path=App.API.ConvertPath(path,target)
        this.Goal=goal
        this.Vehicle=vehicle?vehicle:""
    }
    return Find
})(App)