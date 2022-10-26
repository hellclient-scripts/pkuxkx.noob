(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let items=["pili dan","shi zi"]
    let Throwing= function(){
        proposal.call(this,"throwing")
        this.Submit=function(){
            if (!App.GetEquipmentObj("Lupi dai")){
                return false
            }
            for (var i=0;i<items.length;i++){
                let item=App.GetItemObj(items[i],true)
                if (item){
                    return true
                }
            }
            return false
        }
        this.Execute=function(){
            for (var i=0;i<items.length;i++){
                let item=App.GetItemObj(items[i],true)
                if (item){
                    App.Send("put "+items[i]+" in lupi dai;i2;l lupi dai")
                }
            }
            App.Next()
        }
    }
    App.RegisterProposal(new Throwing())
})(App)