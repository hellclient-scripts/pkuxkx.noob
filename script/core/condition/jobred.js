(function(App){
    let BaseCondition = Include("core/condition/condition.js")
    let Condition=function(){
        this.ID="jobred"
    }
    Condition.prototype = Object.create(BaseCondition.prototype)
    Condition.prototype.Match=function(param){
        let data=param.trim()
        if (App.Data.Job[data]){
            return App.Data.Job[data].Color=="Red"
        }
        return false
    }
    return Condition
})(App)