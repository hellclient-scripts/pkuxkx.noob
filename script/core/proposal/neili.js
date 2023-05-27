(function (App) {
    let proposal = Include("core/proposal/proposal.js")
    let Neili = function () {
        proposal.call(this, "neili")
        this.Submit = function () {
            App.Core.Neili.Exec()
            return App.Core.Neili.NotEnough()
        }
        this.Execute = function () {
            if (App.Core.Sleep.CanSleep()) {
                App.Commands([
                    App.NewCommand("to", App.Options.NewWalk(App.GetSleepRooms())),
                    App.NewCommand("nobusy"),
                    App.NewCommand("sleep"),
                ]).Push()
            } else {
                App.Commands([
                    App.NewCommand("to", App.Core.Neili.DazuoRoom?App.Options.NewWalk(App.Core.Neili.DazuoRoom):null),
                    App.NewCommand("nobusy"),
                    App.NewCommand("function", function () {
                        if ( App.Core.Neili.CanDazuo()) {
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
                    App.NewCommand("delay", App.Core.Neili.CanDazuo()?1:5),
                    App.NewCommand("nobusy"),
                ]).Push()
            }
            App.Next()
        }
    }
    App.RegisterProposal(new Neili())
})(App)