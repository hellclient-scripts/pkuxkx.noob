
(function(App){
App.Core.OnConnectCharset=function(name, output, wildcards){
    App.Send(App.GetParam("charset"))
    let id=world.GetVariable("id")
    if (id){
        App.Send(id)
    }
    let password=world.GetVariable("password")
    if (password){
        App.Send(password)
    }
    App.Raise("Login")
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
}
})(App)