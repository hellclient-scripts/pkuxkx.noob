(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let StatePrepareCheck = function () {
        basicstate.call(this)
        this.ID = "core.state.prepare.check"
    }
    StatePrepareCheck.prototype = Object.create(basicstate.prototype)
    StatePrepareCheck.prototype.Enter = function (context, oldstatue) {
        basicstate.prototype.Enter.call(this, context, oldstatue)
        let prepare = App.GetContext("Prepare")
        if ((Now() - prepare.StartAt) > 5 * 60 * 100 && GetPriority()==0) {
            SetPriority(1)
            App.Core.HUD.SetWarningMessage("准备时间过长")
        }
        prepare.Check()
        App.ResponseReady()
    }
    return StatePrepareCheck
})(App)