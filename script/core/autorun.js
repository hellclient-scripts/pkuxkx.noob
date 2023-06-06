(function (App) {
    App.Core.Autorun = {}
    App.Core.Autorun.Run=function(){
        let autorun = GetVariable("autorun").trim()
        if (autorun) {
            App.Automaton.Flush()
            Execute(autorun)
        }
    }
    App.RegisterCallback("core.autorun.run",App.Core.Autorun.Run)
    App.Core.Autorun.BindLogin = function () {
        if (!App.Data.LoginCallback) {
            let autorun = GetVariable("autorun").trim()
            if (autorun) {
                App.Data.LoginCallback="core.autorun.run"
            }
        }
    }
})(App)