(function(){
    let basemode=Include("core/combatmode/waimen.js")
    let CombatMode=function(){
        this.ID="核心弟子"
    }
    CombatMode.prototype = Object.create(basemode.prototype)
    CombatMode.prototype.CanAcceptDangerousQuest=function(){
        return false
    }
    CombatMode.prototype.GetWimpy=function(name){
        return "30"
    }
    return CombatMode
})()