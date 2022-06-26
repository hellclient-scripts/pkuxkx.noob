(function(App){
    let BaseCondition = Include("core/condition/condition.js")
    let Condition=function(){
        this.ID="expmax"
    }
    Condition.prototype = Object.create(BaseCondition.prototype)
    Condition.prototype.Match=function(param){
        let exp=(param?param:world.GetVariable("exp_max"))-0
        return App.Data.Exp<=exp
    }
    return Condition
})(App)