(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Neili= function(){
        proposal.call(this,"neili")
        this.Submit=function(){
            return (App.GetParamNeiliMin()-0)>App.Data.HP["eff_neili"]
        }
        this.Execute=function(){
            if (App.Core.Sleep.CanSleep()){
                App.Commands([
                    App.NewCommand("to",App.Options.NewWalk(App.GetSleepRooms())),
                    App.NewCommand("nobusy"),
                    App.NewCommand("sleep"),
                ]).Push()
            }else{
                App.Commands([
                    App.NewCommand("to",App.Options.NewWalk(App.GetSleepRooms())),
                    App.NewCommand("nobusy"),
                    App.NewCommand("do","dazuo max"),
                    App.NewCommand("delay",1),
                    App.NewCommand("nobusy"),
                ]).Push()
            }
            App.Next()
        }
    }
    App.RegisterProposal(new Neili())
})(App)