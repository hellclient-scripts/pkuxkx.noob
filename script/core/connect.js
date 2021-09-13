
(function(app){
app.Core.OnConnectCharset=function(name, output, wildcards){
    app.Send("2")
    app.RaiseEvent("login")
}
})(App)