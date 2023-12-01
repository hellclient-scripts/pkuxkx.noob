(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Overheat= function(){
        proposal.call(this,"overheat")
        this.Submit=function(){
            return App.Core.OverheatMode.Current().Delay()>0;
        }
        this.Execute=function(){
            let delay=App.Core.OverheatMode.Current().Delay()
            if (delay>0){
                Note("水温过高，进入冷却"+delay+"秒。")
                App.NewCommand("idle",delay).Push()
            }
            App.Next()
        }
    }
    App.RegisterProposal(new Overheat())
})(App)