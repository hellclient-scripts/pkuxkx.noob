(function(App){
    let BaseCondition = Include("core/condition/condition.js")
    let Condition=function(){
        this.ID="detail"
    }
    Condition.prototype = Object.create(BaseCondition.prototype)
    Condition.prototype.Match=function(param){
        let data=param.split(" ")
        for( var i=0;i<data.length;i++){
            if (App.Core.Plan.Details[data[i]]){
                return true
            }
        }
        return false
    }
    return Condition
})(App)