(function (app) {
    let Vehicle = Include("core/vehicle/vehicle.js")
    let Slow = function () {
        Vehicle.call(this)
        this.ID="slow"
        this.MultiStep=false
        this.Fly=true
        this.Sender=function(cmd){
            if (app.GetMoved()<5){
                app.Send(cmd)
            }else{
                app.OnStateEvent("move.retry")
            }
        }
    }
    Slow.prototype = Object.create(Vehicle.prototype)
    return Slow
})(App)