(function(App){
    let BaseCondition = Include("core/condition/condition.js")
    let Condition=function(){
        this.ID="xiuxingdian"
    }
    Condition.prototype = Object.create(BaseCondition.prototype)
    Condition.prototype.Match=function(param){
        let xiuxingdian=(param?param:1)-0
        return App.Data.Wuxue.XiuxingDian>=xiuxingdian
    }
    return Condition
})(App)