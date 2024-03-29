(function (App) {
    let proposal = Include("core/proposal/proposal.js")
    let Heal = function () {
        proposal.call(this, "heal")
        this.Submit = function () {
            return App.Core.PerQixue() < App.GetNumberParam("heal_below") || App.Core.PerJing() < App.GetNumberParam("heal_below")
        }
        this.Heal = function () {
            if (App.Core.PerQixue() <= 21 || App.Data.NoForce) {
                App.Commands([
                    App.NewCommand("item", App.Options.NewItem("jinchuang yao")),
                    App.NewCommand("nobusy"),
                    App.NewCommand("do", "eat jinchuang yao;i2"),
                ]).Push()
            } else if (App.Core.PerQixue() <= 51) {
                App.Commands([
                    App.NewCommand("to", App.Options.NewWalk(App.GetSleepRooms())),
                    App.NewCommand("nobusy"),
                    App.NewCommand("do", "yun lifeheal " + GetVariable("id").trim() + ";hp"),
                    App.NewCommand("nobusy"),
                ]).Push()
            } else {
                App.Commands([
                    App.NewCommand("to", App.Options.NewWalk(App.GetSleepRooms())),
                    App.NewCommand("nobusy"),
                    App.NewCommand("do", "do 10 yun heal;hp"),
                    App.NewCommand("nobusy"),
                ]).Push()
            }
        }
        this.Inspire = function () {
            if (App.Core.PerJing() <= 51 || App.Data.NoForce) {
                App.Commands([
                    App.NewCommand("item", App.Options.NewItem("yangjing dan")),
                    App.NewCommand("nobusy"),
                    App.NewCommand("do", "eat yangjing dan"),
                ]).Push()
            } else {
                App.Commands([
                    App.NewCommand("to", App.Options.NewWalk(App.GetSleepRooms())),
                    App.NewCommand("nobusy"),
                    App.NewCommand("do", "yun inspire;hp"),
                    App.NewCommand("nobusy"),
                ]).Push()
            }
        }
        this.Execute = function () {
            if (App.Core.PerQixue() < App.Core.PerJing()) {
                this.Heal()
            } else {
                this.Inspire()
            }
            App.Next()
        }
    }
    App.RegisterProposal(new Heal())
})(App)