(function(App){
    let Condition=function(){
        this.ID=""
    }
    Condition.prototype.Match=function(param){
        return false
    }
    return Condition
})(App)