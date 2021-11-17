(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateProposalMovebank=function(){
        basicstate.call(this)
        this.ID="core.state.proposa.movebank"
    }
    StateProposalMovebank.prototype = Object.create(basicstate.prototype)
    StateProposalMovebank.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        app.Send("qu "+app.GetParam("gold_withdraw")+" gold")
        app.Send("i2")
        app.ResponseReady()
    }
    return StateProposalMovebank
})(App)