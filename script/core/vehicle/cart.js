(function (App) {
    let Vehicle = Include("core/vehicle/vehicle.js")
    let Cart = function () {
        Vehicle.call(this)
        this.TagDrive=true
        this.ID="cart"
        this.Sender=function(cmd){
            App.Send(this.ConvertDrivePath("gan che to ",cmd))
        }
    }
    Cart.prototype = Object.create(Vehicle.prototype)
    return Cart
})(App)