(function(){
    let safenpcs={"狼":true}
    let basemode=Include("core/combatmode/combatmode.js")
    let CombatMode=function(){
        this.ID="身强体壮"
    }
    CombatMode.prototype = Object.create(basemode.prototype)
    CombatMode.prototype.OnBlocked=function(name){
        if (safenpcs[name]){
            return true
        }
        return basemode.OnBlocked(name)
    }
    CombatMode.prototype.GetWimpy=function(name){
        return "50"
    }
    return CombatMode
})()