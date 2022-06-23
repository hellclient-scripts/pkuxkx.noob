(function(){
    let CombatMode=function(){
        this.ID="手无寸铁"
    }
    CombatMode.prototype.CanAcceptCombatQuest=function(){
        return false
    }
    CombatMode.prototype.CanAcceptDangerousQuest=function(){
        return false
    }
    CombatMode.prototype.Tags=function(){
        return []
    }
    CombatMode.prototype.OnBlocked=function(name){
        return false
    }
    CombatMode.prototype.OnGuarded=function(name){
        return false
    }
    CombatMode.prototype.GetWimpy=function(name){
        return "85"
    }
    return CombatMode
})()