(function(App){
    let BaseCondition = Include("core/condition/condition.js")
    let Condition=function(){
        this.ID="fullmeok"
    }
    Condition.prototype = Object.create(BaseCondition.prototype)
    Condition.prototype.Match=function(param){
        return Before(App.Data.LastFullmeSuccess+60*60*1000)
    }
    return Condition
})(App)