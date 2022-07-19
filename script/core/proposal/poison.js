(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Poison= function(){
        proposal.call(this,"poison")
        this.Submit=function(){
            return App.Core.Poison.GetCurrent()!=""
        }
        this.Execute=function(){
            App.Core.Poison.Cure()
        }
    }
    App.RegisterProposal(new Poison())
})(App)