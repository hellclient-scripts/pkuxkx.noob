(function(App){
    let BaseCondition = Include("core/condition/condition.js")
    let Condition=function(){
        this.ID="here"
    }
    const defaultOffset=60*1000
    Condition.prototype = Object.create(BaseCondition.prototype)
    Condition.prototype.Match=function(param){
        let offset=param.trim()*1000
        if (!offset||offset==NaN){
            offset=defaultOffset
        }
        if (App.Data.Afk||Now()-App.Data.LastHere>=offset){
            return false
        }
        return true
    }
    return Condition
})(App)