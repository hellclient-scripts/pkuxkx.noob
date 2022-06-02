(function (App) {
    let Vehicle = Include("core/vehicle/vehicle.js")
    let Slow = function () {
        Vehicle.call(this)
        this.ID="slow"
        this.MultiStep=false
        this.Fly=true
        this.Sender=function(cmd){
            if (App.GetMoved()<4){
                App.Send(cmd)
            }else{
                App.OnStateEvent("move.retry")
            }
        }
    }
    Slow.prototype = Object.create(Vehicle.prototype)
    return Slow
})(App)