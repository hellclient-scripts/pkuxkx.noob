(function(App){
    let BaseCondition = Include("core/condition/condition.js")
    let Condition=function(){
        this.ID="shaqi"
    }
    const defaultOffset=60*1000
    Condition.prototype = Object.create(BaseCondition.prototype)
    Condition.prototype.Match=function(param){
        return App.Data.Score.shaqi&&App.Data.Score.shaqi!="正常"
    }
    return Condition
})(App)