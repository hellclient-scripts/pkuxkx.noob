(function(App){
    App.RegisterCallback("core.pathitem.init",function(){
        if (App.GetItemByName("发光的石头",true)){
            Mapper.settag("wdj.shitou",true)
        }
    })
    App.Bind("PathInit","core.pathitem.init")
})(App)