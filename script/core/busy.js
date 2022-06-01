(function(App){
App.Data.Busy={}
App.Core.OnBusyEnd=function(name, output, wildcards){
    world.EnableTriggerGroup("busy",false)
    world.EnableTimer("busy_retry",false)
    if (App.Data.Busy.Callback){
        App.ExecuteCallback(App.Data.Busy.Callback,App.Data.Busy.Data)
    }
}
App.Core.OnBusyRetry=function(name){
    App.Send("tuna")
}
App.CheckBusy=function(callback,data){
    world.EnableTriggerGroup("busy",true)
    world.EnableTimer("busy_retry",true)
    world.ResetTimer("busy_retry")
    App.Data.Busy={
        Callback:callback,
        Data:data,
    }
    App.Send("tuna")
}
})(App)