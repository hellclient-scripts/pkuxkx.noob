(function (app) {
    let proposal=Include("core/proposal/proposal.js")
    let Cash= function(){
        proposal.call(this,"cash")
        this.Submit=function(){
            return App.GetCash()<App.GetNumberParam("gold_min")
        }
        this.Execute=function(){
            let cmd="qu "+App.GetParam("gold_withdraw")+" gold"
            let active=App.NewActive(App.GetParam("bank_location"),cmd,"",true)
            active.Start()
        }
    }
    App.RegisterProposal(new Cash())
})(App)