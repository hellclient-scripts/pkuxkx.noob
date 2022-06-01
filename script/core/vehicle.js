(function(App){
    let run =Include("core/vehicle/run.js")
    let go = Include("core/vehicle/go.js")
    let cart = Include("core/vehicle/cart.js")
    let slow = Include("core/vehicle/slow.js")

    App.Vehicle=null
    App.Vehicles={
        Run:new run(),
        Go:new go(),
        Cart:new cart(),
        Slow:new slow(),
    }
    App.DefaultVehicle=App.Vehicles.Slow
    App.Vehicle=App.DefaultVehicle
    App.Drive=function(id){
        if(id){
            for (let key in App.Vehicles) {
				if (App.Vehicles[key].ID == id){
                    App.Vehicle=App.Vehicles[key]
                    return
                }
			}
            throw "未知的载具 " +id
        }else{
            App.Vehicle=App.DefaultVehicle
        }
    }
    App.RegisterCallback("core.vehicle.inittags",function(){
        Mapper.settag("drive",App.Vehicle.TagDrive)
    })
    App.Bind("PathInit","core.vehicle.inittags")
    App.Go=function(cmd){
        App.Vehicle.Send(cmd)
    }
})(App)