(function (app) {
    let Proposal=function(id){
        if (!id) {
            throw "Proposal的id不能为空"
        }
        this.ID=id
        this.Execute=function(){
        }
        this.Submit=function(){
            return false
        }
    }
    return Proposal
})(App)