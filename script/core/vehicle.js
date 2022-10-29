(function(App){
    let run =Include("core/vehicle/run.js")
    let slow = Include("core/vehicle/slow.js")

    App.Vehicle=null
    App.Vehicles={
        Run:new run(),
        Slow:new slow(),
    }
    App.GetVehicle=function(id){
        if(!id){
            return App.DefaultVehicle
        }
        for (let key in App.Vehicles) {
            if (App.Vehicles[key].ID == id){
                return App.Vehicles[key]
            }
        }
        throw "未知的载具 " +id        
    }
    App.DefaultVehicle=App.Vehicles.Slow
    App.Vehicle=App.DefaultVehicle
    App.Drive=function(id){
        App.Vehicle=App.GetVehicle(id)
    }
    App.RegisterCallback("core.vehicle.inittags",function(){
        if (App.Vehicle.Tags){
            for (var i=0;i<App.Vehicle.Tags.length;i++){
                Mapper.settag(App.Vehicle.Tags[i],true)
            }
        }
    })
    App.Bind("PathInit","core.vehicle.inittags")
    App.Go=function(cmd){
        App.Vehicle.Send(cmd)
    }
})(App)