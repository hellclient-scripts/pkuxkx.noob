(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Repair= function(){
        proposal.call(this,"repair")
        this.Submit=function(){
            return App.Core.Weapon.ToRepair!=""
        }
        this.Execute=function(){
            App.Core.Weapon.Repair()
        }
    }
    App.RegisterProposal(new Repair())
})(App)