(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Heal= function(){
        proposal.call(this,"inspire")
        this.Submit=function(){
            return App.Core.PerJing()<100
        }
        this.Execute=function(){
            if (App.Core.PerJing()<=50){
                App.Commands([
                    App.NewCommand("item",App.Options.NewItem("yangjing dan")),
                    App.NewCommand("nobusy"),
                    App.NewCommand("do","eat yangjing dan"),
                ]).Push()
            }else{
                App.Commands([
                    App.NewCommand("to",App.Options.NewWalk(App.GetSleepRooms())),
                    App.NewCommand("nobusy"),
                    App.NewCommand("do","yun inspire"),
                    App.NewCommand("nobusy"),
                ]).Push()
            }
            App.Next()
        }
    }
    App.RegisterProposal(new Heal())
})(App)