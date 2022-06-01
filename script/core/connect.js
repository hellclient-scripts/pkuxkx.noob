
(function(App){
App.Core.OnConnectCharset=function(name, output, wildcards){
    App.Send(App.GetParam("charset"))
    App.Raise("Login")
}
})(App)