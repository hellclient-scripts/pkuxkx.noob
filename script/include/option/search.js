(function(App){
    let Search=function(goal,depth,vehicle){
        this.Goal=goal
        this.Depth=depth?depth:1
        this.Vehicle=vehicle?vehicle:""
    }
    return Search
})(App)