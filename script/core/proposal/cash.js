(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Cash= function(){
        proposal.call(this,"cash")
        this.Submit=function(){
            return App.GetCash()<App.GetParamGoldMin()
        }
        this.Execute=function(){
            let cmd="qu "+App.GetParamGoldMin()+" gold;i2"

            App.Commands([
                App.NewCommand("to",App.Options.NewWalk(App.Info.RoomBank)),
                App.NewCommand("nobusy"),
                App.NewCommand("do",cmd),
                App.NewCommand("nobusy"),
            ]).Push()
            App.Next()
        }
    }
    App.RegisterProposal(new Cash())
})(App)