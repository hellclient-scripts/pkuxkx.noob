(function(App){
    let BaseCondition = Include("core/condition/condition.js")
    let Condition=function(){
        this.ID="pot"
    }
    Condition.prototype = Object.create(BaseCondition.prototype)
    Condition.prototype.Match=function(param){
        let pot=(param?param:1)-0
        return App.Data.HP.pot>pot
    }
    return Condition
})(App)