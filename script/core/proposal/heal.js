(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Heal= function(){
        proposal.call(this,"heal")
        this.Submit=function(){
            return (App.Core.PerQixue())<App.GetNumberParam("heal_below")
        }
        this.Execute=function(){
            if (App.Core.PerQixue()<=50){
                App.Commands([
                    App.NewCommand("item",App.Options.NewItem("jinchuang yao")),
                    App.NewCommand("nobusy"),
                    App.NewCommand("do","eat jinchuang yao"),
                ]).Push()
            }else{
                App.Commands([
                    App.NewCommand("to",App.Options.NewWalk(App.GetSleepRooms())),
                    App.NewCommand("nobusy"),
                    App.NewCommand("do","yun heal"),
                    App.NewCommand("nobusy"),
                ]).Push()
            }
            App.Next()
        }
    }
    App.RegisterProposal(new Heal())
})(App)