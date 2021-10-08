(function (app) {
    let Vehicle = Include("core/vehicle/vehicle.js")
    let Go = function () {
        Vehicle.call(this)
        this.ID="go"
        this.TagDrive=true
        this.Sender=function(cmd){
            app.Send(this.ConvertDrivePath("go ",cmd))
        }
    }
    Go.prototype = Object.create(Vehicle.prototype)
    return Go
})(App)