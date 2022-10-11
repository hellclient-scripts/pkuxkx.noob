(function(App){
    let BaseCondition = Include("core/condition/condition.js")
    let Condition=function(){
        this.ID="before"
    }
    Condition.prototype = Object.create(BaseCondition.prototype)
    Condition.prototype.Match=function(param){
        let target=((param-0)+"").slice(0,4).padStart(4,"0")
        let now=new Date()
        let hour=(now.getHours()+"").padStart(2,"0")
        let min=(now.getMinutes()+"").padStart(2,"0")
        return (hour+min)<=target
    }
    return Condition
})(App)