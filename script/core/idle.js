(function (App) {
    App.Core.Idle={}
    App.Core.Idle.OnTimeout=function(){
        if (GetVariable("no_keep_idle").trim()){
            return
        }
        App.Send("idle")
    }
    EnableTimer("keepidle",true)
    App.RegisterCallback("app.core.idle.onsend",function(){
        ResetTimer("keepidle")
    })
    App.Bind("Send","app.core.idle.onsend")
    App.RegisterCallback("app.core.idle.onconnected",function(){
        EnableTimer("keepidle",true)
    })
    App.Bind("Connected","app.core.idle.onconnected")
    App.RegisterCallback("app.core.idle.ondisconnected",function(){
        EnableTimer("keepidle",false)
    })
    App.Bind("Disconnected","app.core.idle.ondisconnected")
})(App)