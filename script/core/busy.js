(function(App){
App.Data.Busy={}
App.Core.OnBusyEnd=function(name, output, wildcards){
    EnableTimer('busy_waitok',false);
    App.RaiseStateEvent("nobusy")
}
App.Core.OnBusy=function(name, output, wildcards){
    EnableTimer('busy_waitok',false);
    App.RaiseStateEvent("busy")
}
App.Core.OnBusyRetry=function(name){
    App.Send("checkbusy")
}
App.RegisterCallback("app.core.busyonconnected",function(){
    world.EnableTimer("busy_retry",false)
})
world.EnableTimer("busy_retry",false)
EnableTimer('busy_waitok',false);
App.Core.CheckBusy=function(){
    App.Send("checkbusy")
}
App.Core.CheckBusyWaitOK=function(){
    ResetTimer('busy_waitok',true);
    EnableTimer('busy_waitok',true);
}
App.Bind("Connected","app.core.busyonconnected")
})(App)