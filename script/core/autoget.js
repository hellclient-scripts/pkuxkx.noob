(function (App) {
    App.Core.Autoget = {}
    App.Core.Autoget.Enabled = []
    App.Core.Autoget.BlockedRooms={
        "松树林":true,
    }
    function Init() {
        let data = GetVariable("autoget").trim().split("\n")
        if (data.length) {
            let enabeld = {}
            for (var i = 0; i < data.length; i++) {
                let id = data[i].trim()
                if (!id || enabeld[id]) {
                    continue
                }
                if (id == "*") {
                    for (var index in App.Core.Autoget.Items) {
                        App.Core.Autoget.Enabled.push(App.Core.Autoget.Items[index])
                    }
                    break
                }
                let items = App.Core.Autoget.Items[id]
                if (items) {
                    App.Core.Autoget.Enabled.push(items)
                }
            }
        }
    }
    App.Core.Autoget.Items = {}
    App.Core.Autoget.Items.money = {}
    App.Core.Autoget.Items.money["Gold"] = function () {
        App.Send("get gold_money")
    }
    App.Core.Autoget.Items.money["Silver"] = function () {
        App.Send("get silver")
    }
    App.Core.Autoget.Items.money["Thousand-cash"] = function () {
        App.Send("get cash")
    }
    let getgem = function (item) {
        App.Send("get gem")
    }
    App.Core.Autoget.GemList = [
        "Di yan","Shan yan","Shui yan","Feng yan","Lei yan","Huo yan","Ze yan","Tian yan",
        "Di jia","Shan jia","Shui jia","Feng jia","Lei jia","Huo jia","Ze jia","Tian jia",
        "Di jiao","Shan jiao","Shui jiao","Feng jiao","Lei jiao","Huo jiao","Ze jiao","Tian jiao",
        "Di yu","Shan yu","Shui yu","Feng yu","Lei yu","Huo yu","Ze yu","Tian yu",
        "Di mu","Shan mu","Shui mu","Feng mu","Lei mu","Huo mu","Ze mu","Tian mu",
        "Di jin","Shan jin","Shui jin","Feng jin","Lei jin","Huo jin","Ze jin","Tian jin",
        "Di bing","Shan bing","Shui bing","Feng bing","Lei bing","Huo bing","Ze bing","Tian bing",
        "Di sui","Shan sui","Shui sui","Feng sui","Lei sui","Huo sui","Ze sui","Tian sui",
        "Di gu","Shan gu","Shui gu","Feng gu","Lei gu","Huo gu","Ze gu","Tian gu",
    ]
    App.Core.Autoget.Items.gem = {}
    for (var i = 0; i < App.Core.Autoget.GemList.length; i++) {
        App.Core.Autoget.Items.gem[App.Core.Autoget.GemList[i]] = getgem
    }
    App.Core.Autoget.Items.zhangqi = {}
    App.Core.Autoget.Items.zhangqi["Zhang qi"] = function () {
        if (App.Data.Score["family"] == "五毒教") {
            App.Send("shequ")
        }
    }

    App.Core.Autoget.Items.medicine = {}
    App.Core.Autoget.Items.medicine["Huolong dan"] = function () {
        App.Send("get huolong dan")
    }
    App.Core.Autoget.Items.medicine["Nvwa shi"] = function () {
        App.Send("get nvwa shi")
    }
    App.Core.Autoget.Items.medicine["Xuejie dan"] = function () {
        App.Send("get xuejie dan")
    }
    App.Core.Autoget.Items.medicine["Qiannian dan"] = function () {
        App.Send("get qiannian dan")
    }
    
    App.Core.Autoget.Execute = function () {
        if (App.Core.Autoget.BlockedRooms[App.Data.Room.Name]){
            return
        }
        for (var i = 0; i < App.Core.Autoget.Enabled.length; i++) {
            let items = App.Core.Autoget.Enabled[i]
            for (var id in items) {
                let item = App.GetRoomObj(id)
                if (item) {
                    items[id](item)
                    break;
                }
            }
        }
    }
    App.RegisterCallback("core.autoget.execute",App.Core.Autoget.Execute)
    App.Bind("move.beforeonstep","core.autoget.execute")
    Init()
})(App)