(function (app) {
    let Vehicle = Include("core/vehicle/vehicle.js")
    let Run = function () {
        Vehicle.call(this)
        this.ID="run"
        this.MultiStep=true
        this.Fly=true
    }
    Run.prototype = Object.create(Vehicle.prototype)
    return Run
})(App)