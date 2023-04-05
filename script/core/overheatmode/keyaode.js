(function(){
    let basemode=Include("core/overheatmode/overheatmode.js")
    let OverheatMode=function(){
        this.ID="磕药的"
    }
    OverheatMode.prototype=Object.create(basemode.prototype)
    OverheatMode.prototype.MoveLimited=function(){
        return false
    }
    OverheatMode.prototype.Delay=function(){
        return 0
    }
    return OverheatMode
})()