(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateProposalWithdraw=function(){
        basicstate.call(this)
        this.ID="core.state.proposa.withdraw"
    }
    StateProposalWithdraw.prototype = Object.create(basicstate.prototype)
    StateProposalWithdraw.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        App.Send("qu "+App.GetParam("gold_withdraw")+" gold")
        App.Send("i2")
        App.ResponseReady()
    }
    return StateProposalWithdraw
})(App)