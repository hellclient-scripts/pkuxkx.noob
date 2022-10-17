(function (App) {
    let proposal = Include("core/proposal/proposal.js")
    let Neili = function () {
        proposal.call(this, "neili")
        this.Submit = function () {
            let min = App.GetParamNeiliMin()
            if (min > 0 && min < 1) {
                return (App.Data.HP["eff_qixue"] / App.Data.HP["qixue"]) < min || (App.Data.HP["eff_jing"] / App.Data.HP["jing"]) < min
            }
            return min > App.Data.HP["eff_neili"]
        }
        this.Execute = function () {
            if (App.Core.Sleep.CanSleep()) {
                App.Commands([
                    App.NewCommand("to", App.Options.NewWalk(App.GetSleepRooms())),
                    App.NewCommand("nobusy"),
                    App.NewCommand("sleep"),
                ]).Push()
            } else {
                let min=App.GetParamNeiliMin()
                App.Commands([
                    App.NewCommand("to", App.Options.NewWalk(App.GetSleepRooms())),
                    App.NewCommand("nobusy"),
                    App.NewCommand("function", function () {
                        if ( min>= 1) {
                            if (App.Data.HP["eff_neili"] < 0) {
                                App.Core.Dazuo()
                            } else {
                                App.Send("dazuo max")
                            }
                        }else{
                            App.Send("#sail")
                        }
                        App.Next()
                    }),
                    App.NewCommand("delay", min>=1?1:5),
                    App.NewCommand("nobusy"),
                ]).Push()
            }
            App.Next()
        }
    }
    App.RegisterProposal(new Neili())
})(App)