(function(App){
App.Data.Busy={}
App.Core.OnBusyEnd=function(name, output, wildcards){
    App.RaiseStateEvent("nobusy")
}
App.Core.OnBusy=function(name, output, wildcards){
    App.RaiseStateEvent("busy")
}
App.Core.OnBusyRetry=function(name){
    // App.Send("checkbusy")
}
App.RegisterCallback("app.core.busyonconnected",function(){
    world.EnableTimer("busy_retry",false)
})
App.Core.CheckBusy=function(){
    App.Send("checkbusy")
}
App.Bind("Connected","app.core.busyonconnected")
})(App)