(function(App){
    App.Core.Sell={}
    App.Core.Sell.ToSell=null
    App.Core.Sell.Check=function(){
        App.Core.Sell.ToSell=null
        for (var i=0;i<App.Data.Items.length;i++){
            let itemname=CNumber.Split(App.Data.Items[i].Name).Item
            let s=App.Info.Sell[itemname]
            if (s!=null){
                App.Core.Sell.ToSell=s
                return true
            }
        }
        return false
    }
    App.Core.Sell.Go=function(){
        if (App.Core.Sell.ToSell!=null){
            switch (App.Core.Sell.ToSell.Type){
                case "sell":
                    let item=App.GetItemByName(App.Core.Sell.ToSell.Label,true)
                    if (item){
                    App.Commands([
                        App.NewCommand("to",App.Options.NewWalk(App.Info.RoomSell)),
                        App.NewCommand("do","sell "+App.Core.Sell.ToSell.ID+" for "+item.Count),
                        App.NewCommand("nobusy"),
                        App.NewCommand("do","i2"),
                    ]).Push()
                }
            }
        }
        App.Next()
    }
}(App))