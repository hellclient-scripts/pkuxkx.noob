(function(App){
    let Path=function(path,vehicle){
        if (typeof(path)=="string"){
            path=App.API.ConvertPath(path)
        }
        this.Path=path
        this.Vehicle=vehicle?vehicle:""
    }
    return Path
})(App)