(function (App) {
    let BaseCondition = Include("core/condition/condition.js")
    let Condition = function () {
        this.ID = "joballok"
    }
    Condition.prototype = Object.create(BaseCondition.prototype)
    Condition.prototype.Match = function (param) {
        let data = param.split(" ")
        for (var i = 0; i < data.length; i++) {
            let id = data.trim()
            if (!App.Data.Job[id] || App.Data.Job[id].Next > 0) {
                return false
            }
        }
        return true
    }
    return Condition
})(App)