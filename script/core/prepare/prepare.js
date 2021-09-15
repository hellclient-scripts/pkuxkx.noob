(function (app) {
    let Prepare=function(id){
        if (!id) {
            throw "Prepare的id不能为空"
        }
        this.Check=function(){
            return false
        }
    }
    return Prepare
})(App)