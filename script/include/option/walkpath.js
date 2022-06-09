(function(App){
    let Walkpath=function(target,vehicle){
        this.Target=target
        this.Vehicle=vehicle?vehicle:""
    }
    Walkpath.prototype.ToCommand=function(){
        return App.NewCommand("to",this)
    }
    return Walkpath
})(App)