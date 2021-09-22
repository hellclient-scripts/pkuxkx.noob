
(function(app){
app.Core.OnConnectCharset=function(name, output, wildcards){
    app.Send(app.GetParam("charset"))
    app.Raise("Login")
}
})(App)