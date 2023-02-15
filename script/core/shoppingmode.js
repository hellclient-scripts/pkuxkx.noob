(function(App){
    App.Core.ShoppingMode={}
    App.Core.ShoppingMode.Modes={}
    App.Core.ShoppingMode.DefaultMode=null
    App.Core.ShoppingMode.Register=function(mode){
            if (!mode.ID){
                throw "ShoppingMode id不可为空"
            }
            App.Core.ShoppingMode.Modes[mode.ID]=mode
    }
    App.Core.ShoppingMode.Current=function(){
        let mode=App.Core.ShoppingMode.Modes[GetVariable("shopping_mode")]
        return mode?mode:App.Core.ShoppingMode.DefaultMode
    }
    App.RegisterCallback("core.shoppingmode.inittags",function(){
        let tags=App.Core.ShoppingMode.Current().Tags()
        tags.forEach(function(tag){
            Mapper.settag(tag,true)
        })
    })
    App.Bind("PathInit","core.shoppingmode.inittags")

    App.Core.ShoppingMode.Register(new (Include("core/shoppingmode/shoppingmode.js"))())
    App.Core.ShoppingMode.Register(new (Include("core/shoppingmode/wenbao.js"))())
    App.Core.ShoppingMode.Register(new (Include("core/shoppingmode/zhongchan.js"))())
    App.Core.ShoppingMode.Register(new (Include("core/shoppingmode/tuhao.js"))())
    App.Core.ShoppingMode.DefaultMode=App.Core.ShoppingMode.Modes["中产阶级"]
})(App)