(function (App) {
    let proposal = Include("core/proposal/proposal.js")
    let Zhenqi = function () {
        proposal.call(this, "zhenqi")
        this.Submit = function () {
            return App.Data.HP["zhenqi"]>0&&((App.Data.HP["eff_zhenqi"]*100/App.Data.HP["zhenqi"])<App.GetNumberParam("heal_below"))
        }
        this.Execute = function () {
            let num=App.Data.HP["zhenqi"]-App.Data.HP["eff_zhenqi"]
            if (num>App.Data.HP["eff_neili"]){
                num=App.Data.HP["eff_neili"]
            }
            if (num<0){
                num=1
            }
            App.Commands([
                App.NewCommand("to", App.Options.NewWalk(App.GetSleepRooms())),
                App.NewCommand("nobusy"),
                App.NewCommand("do","condense "+num),
                App.NewCommand("nobusy"),
            ]).Push()
            App.Next()
        }
    }
    App.RegisterProposal(new Zhenqi())
})(App)