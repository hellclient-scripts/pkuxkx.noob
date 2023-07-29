(function (App) {
    App.Core.Idle={}
    App.Core.Idle.OnTimeout=function(){
        if (App.CurrentStateID() != "manual"){
            App.Core.HUD.WarningMessage="发呆了"
            SetPriority(2)
        }
        if (GetVariable("no_keep_idle").trim()){
            return
        }
        App.Send("shougu from "+world.GetVariable("id").trim())
        App.Send("put undeaded in he;put undeaded in he;")
        App.Core.Autorun.Run()
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