(function (app) {
    let Offer=function(id){
        if (!id) {
            throw "Offer的id不能为空"
        }
        this.ID=id
        this.OnFinish=""
        this.OnAccept=function(){

        }
        this.Accept=function(onFinish){
            this.OnFinish=onFinish
            this.OnAccept()
        }
        this.Evaluate=function(){
            return false
        }
    }
    return Offer
})(App)