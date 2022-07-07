(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Sell= function(){
        proposal.call(this,"sell")
        this.Submit=function(){
            return App.Core.Sell.Check()
        }
        this.Execute=function(){
            App.Core.Sell.Go()
        }
    }
    App.RegisterProposal(new Sell())
})(App)