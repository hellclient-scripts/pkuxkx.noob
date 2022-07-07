(function (App) {
    App.Info.Sell={}
    App.Info.LoadSellLines=function(lines){
        lines.forEach(function(line){
            
            let data=line.split("||")
            if (data.length<3){
                throw "sell ["+line+"]格式错误"
            }
            let sell={
                Label:data[0],
                ID:data[1],
                Type:data[2],
            }
            App.Info.Sell[sell.Label]=sell
        })
    }
    App.RegisterCallback("info.sell.load", function () {
        world.Note("加载拦路人")
        let data=world.ReadLines("info/data/sell.txt")
        App.Info.LoadSellLines(data)
    })
    App.Bind("Init", "info.sell.load")
})(App)