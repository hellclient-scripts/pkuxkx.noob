(function(App){
    let BaseCondition = Include("core/condition/condition.js")
    let Condition=function(){
        this.ID="fullmeok"
    }
    Condition.prototype = Object.create(BaseCondition.prototype)
    Condition.prototype.Match=function(param){
        if (App.Data.Afk){
            return false
        }
        let p=param -0
        if (p==NaN){
            p=0
        }
        return Before(App.Data.LastFullmeSuccess+60*60*1000-p*60*1000)
    }
    return Condition
})(App)