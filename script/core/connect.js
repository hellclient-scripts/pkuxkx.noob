
(function(App){
App.Data.LoginCallback=""
App.Core.OnConnectCharset=function(name, output, wildcards){
    App.Send(App.GetParam("charset"))
    let id=world.GetVariable("id").trim()
    if (id){
        App.Send(id)
    }
    let password=world.GetVariable("password")
    if (password){
        App.Send(password)
    }
    App.Raise("Login")
}
App.Core.BindLoginOnce=function(callback){
    App.Data.LoginCallback=callback
}
App.Core.ConnectInitCmd=""
App.Core.OnNewConnect=function(name, output, wildcards){
    App.Data.Room={}
    App.Core.ConnectInitCmd=GetVariable("connect_cmd")
}
App.Core.OnMxpCheck=function(name, output, wildcards){
    App.Send("not supported")
    if(App.Core.ConnectInitCmd){
        App.Send(App.Core.ConnectInitCmd)
    }
    if (App.Data.LoginCallback){
        App.ExecuteCallback(App.Data.LoginCallback)
        App.Data.LoginCallback=""
    }
}


App.RegisterCallback("core.ondisconnected",function(){
    if(App.Data.LoginCallback){
        Connect()
    }
})
App.Bind("Disconnected","core.ondisconnected")
})(App)