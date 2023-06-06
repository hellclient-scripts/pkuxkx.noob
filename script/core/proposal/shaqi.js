(function (App) {
    let proposal = Include("core/proposal/proposal.js")
    let ShaqiSafe={
        undefined:true,
        null:true,
        "":true,
        "正常":true,
        "偏高":true,
        "紊乱":true,
        "疯狂":true,
    }
    let Shaqi = function () {
        proposal.call(this, "shaqi")
        this.Submit = function () {
            return ShaqiSafe[App.Data.Score.shaqi]!==true
        }
        this.Execute = function () {
            if (Before(App.Data.LastFullmeSuccess+60*60*1000)){
                Note("杀气过高，去忏悔")
                App.Commands([
                    App.NewCommand("to", App.Options.NewWalk("yzsm")),
                    App.NewCommand("nobusy"),
                    App.NewCommand("do","chanhui"),
                    App.NewCommand("nobusy"),
                ]).Push()
            }else{
                Note("杀气过高，没fullme无法忏悔")
                App.Commands([
                    App.NewCommand("to", App.Options.NewWalk("yzsm")),
                    App.NewCommand("delay", 30),
                    App.NewCommand("function",function(){App.Fail()}),
                ]).Push()
            }
            App.Next()
        }
    }
    App.RegisterProposal(new Shaqi())
})(App)