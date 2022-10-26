(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let LupiDai= function(){
        proposal.call(this,"lupidai")
        this.Submit=function(){
            if (!App.GetEquipmentObj("Lupi dai")){
                return false
            }
            let item=App.GetLupiDaiItemByName("铜板",true)
            return !(item && item.Count>App.GetNumberParam("lupidaicoin"))
        }
        this.Execute=function(){
            let cmd="qu "+App.GetParam("lupidaiqucoin")+" coin;put "+App.GetParam("lupidaiqucoin")+" coin_money in lupi dai;i2;l lupi dai"
            App.Commands([
                App.NewCommand("to",App.Options.NewWalk(App.GetParam("bank_location"))),
                App.NewCommand("nobusy"),
                App.NewCommand("do",cmd),
                App.NewCommand("nobusy"),
            ]).Push()
            App.Next()
        }
    }
    App.RegisterProposal(new LupiDai())
})(App)