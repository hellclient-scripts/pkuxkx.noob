(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Heal= function(){
        proposal.call(this,"heal")
        this.Submit=function(){
            return (App.Data.HP["per_qixue"])<App.GetNumberParam("heal_below")
        }
        this.Execute=function(){
                App.Commands([
                    App.NewCommand("to",App.Options.NewWalk(App.GetSleepRooms())),
                    App.NewCommand("nobusy"),
                    App.NewCommand("do","yun heal"),
                    App.NewCommand("nobusy"),
                ]).Push()
            App.Next()
        }
    }
    App.RegisterProposal(new Heal())
})(App)