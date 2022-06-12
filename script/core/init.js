(function (App) {
    App.Core.InitCmd="l;set custom_hp 1;set no_autosave 1;set area_detail 1"
    App.Core.Inited=false
    App.Core.Init=function(){
        App.Send(App.Core.InitCmd)
        App.Response("core","init")
    }
    App.RegisterCallback("app.core.init",function(){
        App.Core.Inited=true
        Note("初始化成功")
        App.RaiseStateEvent("inited")
    })
    App.Bind("Response.core.init","app.core.init")

})(App)