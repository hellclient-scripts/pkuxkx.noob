(function (App) {
    let proposal = Include("core/proposal/proposal.js")
    let Cun = function () {
        proposal.call(this, "cun")
        this.Submit = function () {
            return App.GetCash() > App.GetParamGoldMax()
        }
        this.Execute = function () {
            let num = Math.floor(App.GetCash()-App.GetParamGoldMax()+(App.GetParamGoldMax()-App.GetParamGoldMin())/2)
            let cash = App.GetItemNumber("cash", true)
            var cmd
            if (cash) {
                let cashnum = cash > (num/10)?cash:Math.floor(num/10)
                cmd = "cun " + cashnum + " gold"
            } else {
                cmd = "cun " + num + " gold"
            }
            App.Commands([
                App.NewCommand("to", App.Options.NewWalk(App.GetParam("bank_location"))),
                App.NewCommand("nobusy"),
                App.NewCommand("do", cmd),
                App.NewCommand("nobusy"),
            ]).Push()
            App.Next()
        }
    }
    App.RegisterProposal(new Cun())
})(App)