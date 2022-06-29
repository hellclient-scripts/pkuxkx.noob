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
    App.Send("checkbusy")
}
App.CheckBusy=function(callback,data){
    world.EnableTriggerGroup("busy",true)
    world.EnableTimer("busy_retry",true)
    world.ResetTimer("busy_retry")
    App.Data.Busy={
        Callback:callback,
        Data:data,
    }
    App.Send("checkbusy")
}
App.StateNoBusy=function(){
    App.CheckBusy("app.core.busynobusy")
}
App.RegisterCallback("app.core.busynobusy",function(){
    App.RaiseStateEvent("nobusy")
})

App.RegisterCallback("app.core.busyonconnected",function(){
    world.EnableTriggerGroup("busy",true)
    world.EnableTimer("busy_retry",false)
})
App.Bind("Connected","app.core.busyonconnected")
})(App)