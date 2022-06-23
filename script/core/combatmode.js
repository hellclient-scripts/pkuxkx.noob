(function(App){
    App.Core.CombatMode={}
    App.Core.CombatMode.Modes={}
    App.Core.CombatMode.DefaultMode=null
    App.Core.CombatMode.Register=function(mode){
            if (!mode.ID){
                throw "CombatMode id不可为空"
            }
            App.Core.CombatMode.Modes[mode.ID]=mode
    }
    App.Core.CombatMode.Current=function(){
        let mode=App.Core.CombatMode.Modes[GetVariable("combat_mode")]
        return mode?mode:App.Core.CombatMode.DefaultMode
    }
    App.RegisterCallback("core.combatmode.inittags",function(){
        let tags=App.Core.CombatMode.Current().Tags()
        tags.forEach(function(tag){
            Mapper.settag(tag,true)
        })
    })
    App.Bind("PathInit","core.combatmode.inittags")
    App.Core.CombatMode.Register(new (Include("core/combatmode/combatmode.js"))())
    App.Core.CombatMode.Register(new (Include("core/combatmode/strong.js"))())
    App.Core.CombatMode.Register(new (Include("core/combatmode/waimen.js"))())
    App.Core.CombatMode.Register(new (Include("core/combatmode/hexin.js"))())
    App.Core.CombatMode.DefaultMode=App.Core.CombatMode.Modes["手无寸铁"]
})(App)