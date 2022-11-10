(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Silver= function(){
        proposal.call(this,"silver")
        this.Submit=function(){
            let silver = App.GetItemNumber("silver", true)

            return (silver>200)
        }
        this.Execute=function(){
            let silver = App.GetItemNumber("silver", true)
            App.Commands([
                App.NewCommand("to",App.Options.NewWalk("yzqz")),
                App.NewCommand("nobusy"),
                App.NewCommand("do","duihuan "+Math.floor(silver/100)*100 +" silver to gold;i2"),
                App.NewCommand("nobusy"),
            ]).Push()
            App.Next()
        }
    }
    App.RegisterProposal(new Silver())
})(App)