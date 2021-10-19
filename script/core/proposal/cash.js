(function (app) {
    let proposal=Include("core/proposal/proposal.js")
    let Cash= function(){
        proposal.call(this,"cash")
        this.Submit=function(){
            return app.GetCash()<app.GetNumberParam("gold_min")
        }
        this.OnExecute=function(){
            let move=app.NewMove("walk",app.GetParam("bank_location"),"core.proposal.cash.arrive",{})
            move.Start()
        }
    }
    app.RegisterCallback("core.proposal.cash.arrive",function(){
        app.Send("qu "+app.GetParam("gold_withdraw")+" gold")
        app.Send("i2")
        app.CheckBusy(this.OnFinish)
    })
    app.RegisterProposal(new Cash())
})(App)