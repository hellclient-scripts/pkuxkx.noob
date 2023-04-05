(function(App){
    App.Core.OverheatMode={}
    App.Core.OverheatMode.Modes={}
    App.Core.OverheatMode.DefaultMode=null
    App.Core.OverheatMode.Register=function(mode){
            if (!mode.ID){
                throw "OverheatMode id不可为空"
            }
            App.Core.OverheatMode.Modes[mode.ID]=mode
    }
    App.Core.OverheatMode.Current=function(){
        let mode=App.Core.OverheatMode.Modes[GetVariable("overheat_mode")]
        return mode?mode:App.Core.OverheatMode.DefaultMode
    }
    App.Core.OverheatMode.Register(new (Include("core/overheatmode/overheatmode.js"))())
    App.Core.OverheatMode.Register(new (Include("core/overheatmode/tixiaosheng.js"))())
    App.Core.OverheatMode.Register(new (Include("core/overheatmode/keyaode.js"))())
    App.Core.OverheatMode.DefaultMode=App.Core.OverheatMode.Modes["死宅男"]
})(App)