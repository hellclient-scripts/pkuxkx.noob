(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Baofu= function(){
        proposal.call(this,"baofu")
        this.Submit=function(){
            return (GetVariable("valuing").trim()!=""&&App.GetItemObj("bao fu",true)==null)
        }
        this.Execute=function(){
            App.Produce("bao fu",1)
        }
    }
    App.RegisterProposal(new Baofu())
})(App)