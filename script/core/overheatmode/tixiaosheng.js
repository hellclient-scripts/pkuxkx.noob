(function () {
    let basemode = Include("core/overheatmode/overheatmode.js")
    let OverheatMode = function () {
        this.ID = "体校生"
    }
    OverheatMode.prototype = Object.create(basemode.prototype)
    let offset = 8 * 60 * 1000
    let shortoffset = 3 * 60 * 1000
    OverheatMode.prototype.MoveLimited = function () {
        if (Now() - App.Core.Overheat.LasfBuffFull < offset) {
            return App.Core.Overheat.IsOverThreshold()
        }
        return false
    }
    OverheatMode.prototype.Delay = function () {
        if (Now() - App.Core.Overheat.LasfBuffFullRaw < shortoffset) {
            return App.Core.Overheat.IsOverThreshold()?45:0
        }else if (Now() - App.Core.Overheat.LasfBuffFull < offset) {
            return App.Core.Overheat.IsOverThreshold()?30:0
        }
        return 0
    }
    OverheatMode.prototype.Threshold=function(){
        if (Now() - App.Core.Overheat.LasfBuffFullRaw < shortoffset) {
            return App.GetNumberParam("overheat_threshold")*2/3
        }
        App.GetNumberParam("overheat_threshold")
    }

    return OverheatMode
})()