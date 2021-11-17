(function (app) {
    let proposal=Include("core/proposal/proposal.js")
    let Cash= function(){
        proposal.call(this,"cash")
        this.Submit=function(){
            return app.GetCash()<app.GetNumberParam("gold_min")
        }
        this.Execute=function(){
            let cmd="qu "+app.GetParam("gold_withdraw")+" gold"
            let active=app.NewActive(app.GetParam("bank_location"),cmd,"",true)
            active.Start()
        }
    }
    app.RegisterProposal(new Cash())
})(App)