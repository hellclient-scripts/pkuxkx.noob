(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Toggle= function(){
        proposal.call(this,"toggle")
        this.Submit=function(){
            return App.Core.Buff.NeedToggleOff()
        }
        this.Execute=function(){
            App.Commands([
                App.NewCommand("function",App.Core.Buff.AutoToggle),
                App.NewCommand("nobusy"),
            ]).Push()
            App.Next()
        }
    }
    App.RegisterProposal(new Toggle())
})(App)