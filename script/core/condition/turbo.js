(function(App){
    let BaseCondition = Include("core/condition/condition.js")
    let Condition=function(){
        this.ID="turbo"
    }
    const defaultOffset=60*1000
    Condition.prototype = Object.create(BaseCondition.prototype)
    Condition.prototype.Match=function(param){
        return App.Core.Afk.IsTurbo()
    }
    return Condition
})(App)