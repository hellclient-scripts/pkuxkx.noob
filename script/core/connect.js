
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
})(App)