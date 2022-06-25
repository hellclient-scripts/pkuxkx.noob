(function(){
    let basemode=Include("core/combatmode/strong.js")
    let CombatMode=function(){
        this.ID="外门弟子"
    }
    CombatMode.prototype = Object.create(basemode.prototype)
    CombatMode.prototype.CanAcceptCombatQuest=function(){
        return true
    }
    CombatMode.prototype.GetWimpy=function(name){
        return "40"
    }
    return CombatMode
})()