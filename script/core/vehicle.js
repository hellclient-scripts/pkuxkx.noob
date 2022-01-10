(function(app){
    let run =Include("core/vehicle/run.js")
    let go = Include("core/vehicle/go.js")
    let cart = Include("core/vehicle/cart.js")
    let slow = Include("core/vehicle/slow.js")

    app.Vehicle=null
    app.Vehicles={
        Run:new run(),
        Go:new go(),
        Cart:new cart(),
        Slow:new slow(),
    }
    app.DefaultVehicle=app.Vehicles.Slow
    app.Vehicle=app.DefaultVehicle
    app.Drive=function(id){
        if(id){
            for (let key in app.Vehicles) {
				if (app.Vehicles[key].ID == id){
                    app.Vehicle=app.Vehicles[key]
                    return
                }
			}
            throw "未知的载具 " +id
        }else{
            app.Vehicle=app.DefaultVehicle
        }
    }
    app.RegisterCallback("core.vehicle.inittags",function(){
        Mapper.settag("drive",app.Vehicle.TagDrive)
    })
    app.Bind("PathInit","core.vehicle.inittags")
    app.Go=function(cmd){
        app.Vehicle.Send(cmd)
    }
})(App)