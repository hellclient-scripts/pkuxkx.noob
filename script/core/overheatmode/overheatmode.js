(function(){
    let OverheatMode=function(){
        this.ID="死宅男"
    }
    OverheatMode.prototype.MoveLimited=function(){
        return App.Core.Overheat.IsOverThreshold()
    }
    OverheatMode.prototype.Delay=function(){
        return App.Core.Overheat.IsOverThreshold()?30:0
    }
    return OverheatMode
})()