(function(App){
    let Path=function(path,vehicle){
        this.Path=App.API.ConvertPath(path)
        this.Vehicle=vehicle?vehicle:""
    }
    return Path
})(App)