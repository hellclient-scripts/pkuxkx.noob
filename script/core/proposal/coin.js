(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Coin= function(){
        proposal.call(this,"coin")
        this.Submit=function(){
            if (!App.GetEquipmentObj("Lupi dai")){
                return false
            }
            let item=App.GetLupiDaiItemByName("铜板",true)
            if (item && item.Count>App.GetParam("lupidaiqucoin")){
                return false
            }
            return App.GetItemByName("铜板")!=null
        }
        this.Execute=function(){
            let cmd="put coin_money in lupi dai;i2;l lupi dai"
            App.Commands([
                App.NewCommand("do",cmd),
            ]).Push()
            App.Next()
        }
    }
    App.RegisterProposal(new Coin())
})(App)