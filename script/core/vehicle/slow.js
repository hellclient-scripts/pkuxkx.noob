(function (App) {
    let Vehicle = Include("core/vehicle/vehicle.js")
    let Slow = function () {
        Vehicle.call(this)
        this.ID="slow"
        this.MultiStep=false
        this.Fly=true
    }
    Slow.prototype = Object.create(Vehicle.prototype)
    return Slow
})(App)