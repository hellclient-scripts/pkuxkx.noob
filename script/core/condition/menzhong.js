(function(App){
    let BaseCondition = Include("core/condition/condition.js")
    let Condition=function(){
        this.ID="menzhong"
    }
    Condition.prototype = Object.create(BaseCondition.prototype)
    Condition.prototype.Match=function(param){
        let menzhong=(param?param:1)-0
        return App.Data.Score.menzhong>menzhong
    }
    return Condition
})(App)