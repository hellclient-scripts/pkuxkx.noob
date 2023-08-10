(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Silver= function(){
        proposal.call(this,"silver")
        this.Submit=function(){
            let silver = App.GetItemNumber("silver", true)
            let coin=App.GetItemNumber("coin", true)
            return (silver>200 || coin>5000)
        }
        this.Execute=function(){
            let silver = App.GetItemNumber("silver", true)
            let cmd=""
            if (silver>200){
                cmd="duihuan "+Math.floor(silver/100)*100 +" silver to gold;i2"
            }else{
                cmd="cun all coin;i2"
            }
            App.Commands([
                App.NewCommand("to",App.Options.NewWalk(App.Info.RoomBank)),
                App.NewCommand("nobusy"),
                App.NewCommand("do",cmd),
                App.NewCommand("nobusy"),
            ]).Push()
            App.Next()
        }
    }
    App.RegisterProposal(new Silver())
})(App)