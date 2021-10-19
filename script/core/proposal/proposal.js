(function (app) {
    let Proposal=function(id){
        if (!id) {
            throw "Proposal的id不能为空"
        }
        this.ID=id
        this.OnFinish=""
        this.OnExecute=function(){

        }
        this.Execute=function(onFinish){
            this.OnFinish=onFinish
            this.OnExecute()
        }
        this.Submit=function(){
            return false
        }
    }
    return Proposal
})(App)