(function(App){
    App.Core.GameMode={}
    App.Core.GameMode.Modes={}
    App.Core.GameMode.DefaultMode=null
    App.Core.GameMode.Register=function(mode){
            if (!mode.ID){
                throw "GameMode id不可为空"
            }
            App.Core.GameMode.Modes[mode.ID]=mode
    }
    App.Core.GameMode.Current=function(){
        let mode=App.Core.GameMode.Modes[GetVariable("game_mode")]
        return mode?mode:App.Core.GameMode.DefaultMode
    }
    App.Core.GameMode.Register(new (Include("core/gamemode/gamemode.js"))())
    App.Core.GameMode.Register(new (Include("core/gamemode/jixingzi.js"))())
    App.Core.GameMode.Register(new (Include("core/gamemode/xiuxian.js"))())
    App.Core.GameMode.Register(new (Include("core/gamemode/langui.js"))())
    App.Core.GameMode.DefaultMode=App.Core.GameMode.Modes["随意"]
})(App)