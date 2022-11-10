(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Asset= function(){
        proposal.call(this,"asset")
        this.Submit=function(){
            return App.Core.Asset.Check()
        }
        this.Execute=function(){
            App.Core.Asset.Start("")
        }
    }
    App.RegisterProposal(new Asset())
})(App)