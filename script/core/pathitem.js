(function(App){
    App.RegisterCallback("core.pathitem.init",function(){
        if (App.GetItemByName("发光的石头",true)){
            Mapper.settag("wdj.shitou",true)
        }
        if (App.GetItemByName("香蕉",true)){
            Mapper.settag("em.banana",true)
        }
        if (App.GetCash()>50){
            Mapper.settag("cash50",true)
        }
    })
    App.Bind("PathInit","core.pathitem.init")
})(App)