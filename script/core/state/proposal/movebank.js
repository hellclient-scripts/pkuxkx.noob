(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let StateProposalMovebank=function(){
        basicstate.call(this)
        this.ID="core.state.proposa.movebank"
    }
    StateProposalMovebank.prototype = Object.create(basicstate.prototype)
    StateProposalMovebank.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        App.Send("qu "+App.GetParam("gold_withdraw")+" gold")
        App.Send("i2")
        App.ResponseReady()
    }
    return StateProposalMovebank
})(App)