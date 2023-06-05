
(function(App){
App.Data.LoginCallback=""

App.Core.OnConnectCharset=function(name, output, wildcards){
    Send(App.GetParam("charset"))
    let id=world.GetVariable("id").trim()
    if (id){
        Send(id)
    }
    let password=world.GetVariable("password")
    if (password){
        Note("******(输入密码)")
        SendNoEcho(password)
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
App.Core.SendConnectCommand=function(){
    App.Send(GetVariable("connect_cmd"))
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

App.Core.OnReconnect = function () {
    world.EnableTimer("App.Core.OnReconnect",false)
    Connect()
}
world.EnableTimer("App.Core.OnReconnect",false)

App.RegisterCallback("core.ondisconnected",function(){
    if(App.Data.LoginCallback){
        world.ResetTimer("App.Core.OnReconnect")
        world.EnableTimer("App.Core.OnReconnect",true)
        Note("10秒后重连")
    }
})
App.Bind("Disconnected","core.ondisconnected")
App.Quit=function(){
    App.Commands([
        App.NewCommand("asset", "quit"),
        App.NewCommand("nobusy"),
        App.NewCommand("to", App.Options.NewWalk(Object.keys(App.Info.HomeRooms))),
        App.NewCommand("nobusy"),
        App.NewCommand("quit")
    ]).Push()
    App.Next()
}
App.RegisterCallback("core.relogin", function () {
    Note("恢复连接")
    App.Commands([
        App.NewCommand("to", App.Options.NewWalk(Object.keys(App.Info.HomeRooms))),
        App.NewCommand("nobusy"),
        App.NewCommand("do", "get all"),
        App.NewCommand("nobusy"),
    ]).Push()
    App.Next()
})
App.Relogin = function () {
    App.Commands([
        App.NewCommand("asset", "relogin"),
        App.NewCommand("nobusy"),
        App.NewCommand("to", App.Options.NewWalk(Object.keys(App.Info.HomeRooms))),
        App.NewCommand("nobusy"),
        App.NewCommand("quit","core.relogin")
    ]).Push()
    App.Next()
}

})(App)