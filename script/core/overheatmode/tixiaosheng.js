(function(){
    let basemode=Include("core/overheatmode/overheatmode.js")
    let OverheatMode=function(){
        this.ID="体校生"
    }
    OverheatMode.prototype=Object.create(basemode.prototype)
    OverheatMode.prototype.MoveLimited=function(){
        return App.Core.Overheat.IsOverThreshold()
    }
    OverheatMode.prototype.Delay=function(){
        return 0
    }
    return OverheatMode
})()