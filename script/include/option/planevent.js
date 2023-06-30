(function(App){
    let Event=function(id,details){
        this.ID=id
        this.Details=details?details:[]
    }
    return Event
})(App)