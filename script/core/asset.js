(function (App) {
    let Action = Include("include/action.js")
    let Asset = Include("include/asset.js")
    let AssetFilter = Include("include/assetfilter.js")

    let Valuation = Include("include/valuation.js")
    App.Core.Asset = {}
    App.Core.Asset.Conditions = {}
    App.Core.Asset.Last = 0
    App.Data.AssetList = []
    App.Core.Asset.Valuation = null
    App.Core.Asset.Action = null
    App.Core.Asset.Asset = null
    App.Core.Asset.LoadActions = function (data) {
        let lines = data.split("\n")
        let result = []
        for (var i = 0; i < lines.length; i++) {
            let line = lines[i].trim()
            if (line) {
                let action = new Action(line)
                action.Filter = new AssetFilter(action.Data)
                result.push(action)
            }
        }
        return result
    }
    App.Core.Asset.Valuings = []
    App.Core.Asset.RegisterValuing = function (valuing) {
        App.Core.Asset.Valuings.push(valuing)
    }
    App.Core.Asset.Conditions["hole"] = function (data, asset) {
        if (asset.Hole == -1) {
            return null
        }
        let hole = data - 0
        return asset.Hole >= hole
    }
    App.Core.Asset.Conditions["grade"] = function (data, asset) {
        if (asset.Grade == -1) {
            return null
        }
        let value = data - 0
        return asset.Grade >= value
    }
    App.Core.Asset.Conditions["value"] = function (data, asset) {
        if (asset.Value == -1) {
            return null
        }
        let value = data - 0
        return asset.Value >= value
    }
    App.Core.Asset.Conditions["quality"] = function (data, asset) {
        if (asset.Quality == -1) {
            return null
        }
        let value = data - 0
        return asset.Quality >= value
    }
    App.Core.Asset.Conditions["effect"] = function (data, asset) {
        if (asset.Identified < 1) {
            return null
        }
        return asset.Effect(data)
    }

    let autoActions = App.Core.Asset.LoadActions(world.ReadFile("info/data/assetpreset/auto.txt"))
    App.Core.Asset.OnItemStart = function (name, output, wildcards) {
        switch (wildcards[0]) {
            case "装  备":
                App.Data.AssetList = []
                App.Core.Asset.CurrentType = ""
                App.Data.ItemList.ID=""
                App.Data.ItemList.Items=[]        
                world.EnableTriggerGroup("core.asset.item", false)
                break
            case "财  宝":
                App.Core.Asset.CurrentType = "treasure"
                world.EnableTriggerGroup("core.asset.item", true)
                break
            case "食  物":
                App.Core.Asset.CurrentType = "food"
                world.EnableTriggerGroup("core.asset.item", true)
                break
            case "药  物":
                App.Core.Asset.CurrentType = "food"
                world.EnableTriggerGroup("core.asset.item", true)
                break
            case "其  它":
                App.Core.Asset.CurrentType = "item"
                world.EnableTriggerGroup("core.asset.item", true)
                break
            default:
                App.Core.Asset.CurrentType = ""
                world.EnableTriggerGroup("core.asset.item", false)
                break
        }
    }
    let itemsre = /^│(\s*＊{0,1}[^()×＋]+＋{0,1}(\([^()]+\)){0,1}(×\d+){0,1}\s+)*│$/
    let itemre = /(＊{0,1})([^ ()×＋]+)(＋{0,1})(\(([^()]+)\)){0,1}(×(\d+)){0,1}/g
    App.Core.Asset.OnItem = function (name, output, wildcards) {
        let result = output.match(itemsre)
        if (result == null) {
            world.EnableTriggerGroup("core.asset.item", false)
            return
        }
        let data = output.slice(1, -1)
        let items = [...data.matchAll(itemre)]
        for (var i = 0; i < items.length; i++) {
            let itemraw = items[i]
            let itemdata = CNumber.Split(itemraw[2])
            let item = {
                Binded: itemraw[1] == "＊",
                Name: itemdata.Item,
                ID: itemraw[5],
                Count: itemraw[7] ? (itemraw[7] - 0) :itemdata.Count,
            }
            App.Core.Asset.Convert(item)
        }
    }
    App.Core.Asset.Convert = function (obj) {
        let asset = new Asset()
        for (var i = 0; i < App.Core.Asset.Valuings.length; i++) {
            App.Core.Asset.Valuings[i].Value(obj, asset)
        }
        App.Data.AssetList.push(asset)
    }
    world.EnableTriggerGroup("core.asset.item", false)

    App.Core.Asset.Load = function (strategy) {
        let v = new Valuation(strategy)
        v.Actions = App.Core.Asset.LoadActions(GetVariable("valuing"))
        switch (v.GetPreset()) {
            case "auto":
                v.Actions = v.Actions.concat(autoActions)
                break
        }
        v.Load()
        App.Core.Asset.Valuation = v
        return v
    }
    App.Core.Asset.Check = function () {
        v = App.Core.Asset.Load("")
        if (App.Data.Load && v.Weight) {
            if (App.Data.Load > v.Weight) {
                Note("负重过重，超过"+v.Weight)
                return true
            }
        }
        for (var i = 0; i < App.Data.AssetList.length; i++) {
            var asset=App.Data.AssetList[i]
            if (asset.Equipped || asset.Binded){
                continue
            }
            for (var k = 0; k < v.Treasure.length; k++)
                if (asset.Type[v.Treasure[k]]) {
                    return true
                }
        }
        return (Now() - App.Core.Asset.Last) > 10 * 60 * 1000
    }
    App.Core.Asset.Commands = {
        "#sell": true,
        "#drop": true,
        "#store": true,
        "#keep": true,
    }
    App.Core.Asset.Prepare = function (strategy) {
        v = App.Core.Asset.Load(strategy)
        let result = {}
        for (var i = 0; i < App.Data.AssetList.length; i++) {
            let asset = App.Data.AssetList[i]
            if (asset.Binded || asset.Equipped || !asset.ID || result[asset.ID.toLowerCase()]) {
                continue
            }
            for (var k = 0; k < v.Actions.length; k++) {
                let action = v.Actions[k]
                if ((action.Strategy == "" || action.Strategy == strategy) && App.Core.Asset.Commands[action.Command] && action.Filter.Filter(asset)) {
                    result[asset.ID.toLowerCase()] = true
                    break
                }
            }
        }
        v.Assets = Object.keys(result)
        v.Index = 0
        App.Core.Asset.Valuation = v
        App.Core.Asset.Action = null
        App.Core.Asset.Asset = null
        return
    }
    App.Core.Asset.Start = function (strategy) {
        App.Core.Asset.Last = Now()
        App.Core.Asset.Prepare(strategy)
        App.Core.Asset.Execute()
    }
    App.Core.Asset.Finish = function () {
        Note("物品处理完毕")
        App.Send("i")
        App.Next()
    }
    App.Core.Asset.Execute = function () {
        if (App.Core.Asset.Valuation.Assets.length > 0) {
            let id = App.Core.Asset.Valuation.Assets[0]
            App.Send("i " + id)
            App.Response("asset", "item")
        } else {
            App.Core.Asset.Finish()
        }
    }
    App.Core.Asset.ProcessCommand = {
        "#sell": true,
        "#drop": true,
        "#store": true,
        "#keep": true,
        "#carry": true,
    }
    App.Core.Asset.CheckCondition = function (action, asset) {
        for (i = 0; i < action.Conditions.length; i++) {
            let condition = App.Core.Asset.Conditions[action.Conditions[i].Type]
            if (condition == null) {
                throw "道具评估条件 " + action.Conditions[i].Type + "不存在。"
            }
            let result = condition(action.Conditions[i].Data, asset)
            if (result === null) {
                return false
            }
            if (result === action.Conditions[i].Exclude) {
                return false
            }
        }
        return true
    }
    App.Core.Asset.DoSell = function (action) {
        switch (App.Core.Asset.Asset.SellType) {
            case "jindian":
                App.Commands([
                    App.NewCommand("to", App.Options.NewWalk("yz-jindian")),
                    App.NewCommand("do", "sell " + App.Core.Asset.Asset.UNID),
                    App.NewCommand("nobusy"),
                    App.NewCommand("function", function () {
                        App.Core.Asset.Execute()
                    }),
                ]).Push()
                App.Next()
                break
            case "rbz":
                App.Commands([
                    App.NewCommand("to", App.Options.NewWalk("yz-rbz")),
                    App.NewCommand("do", "sell " + App.Core.Asset.Asset.UNID),
                    App.NewCommand("nobusy"),
                    App.NewCommand("function", function () {
                        App.Core.Asset.Execute()
                    }),
                ]).Push()
                App.Next()
                break
            default:
                let cmd = (App.Core.Asset.Asset.Count > 1) ? App.Core.Asset.Asset.ID.toLowerCase() + " for " + (App.Core.Asset.Asset.Count - (action.Param||0-0)): App.Core.Asset.Asset.UNID
                App.Commands([
                    App.NewCommand("to", App.Options.NewWalk("yzdp")),
                    App.NewCommand("do", "sell " + cmd),
                    App.NewCommand("nobusy"),
                    App.NewCommand("function", function () {
                        App.Core.Asset.Execute()
                    }),
                ]).Push()
                App.Next()
                break

        }
    }
    App.Core.Asset.DoKeep = function (action) {
        let cmd = (App.Core.Asset.Asset.Count > 1) ? App.Core.Asset.Asset.Count + " " + App.Core.Asset.Asset.UNID : App.Core.Asset.Asset.UNID
        if (App.Core.Asset.Valuation.Keeper) {
            let data = SplitN(App.Core.Asset.Valuation.Keeper, "@", 2)
            if (data.length < 2) { data.push("yz-rbz") }
            App.Commands([
                App.NewCommand("to", App.Options.NewWalk(data[1])),
                App.NewCommand("do", "give " + cmd + " to " + data[0]),
                App.NewCommand("nobusy"),
                App.NewCommand("function", function () {
                    App.Core.Asset.Execute()
                }),
            ]).Push()
        } else {
            App.Commands([
                App.NewCommand("do", "put " + cmd + " in bao fu"),
                App.NewCommand("nobusy"),
                App.NewCommand("function", function () {
                    App.Core.Asset.Execute()
                }),
            ]).Push()
        }
        App.Next()

    }
    App.Core.Asset.DoDrop = function (action) {
        let cmd = (App.Core.Asset.Asset.Count > 1) ? App.Core.Asset.Asset.Count + " " + App.Core.Asset.Asset.UNID : App.Core.Asset.Asset.UNID
        App.Commands([
            App.NewCommand("to", App.Options.NewWalk("yz-ljz")),
            App.NewCommand("do", "drop " + cmd),
            App.NewCommand("nobusy"),
            App.NewCommand("function", function () {
                App.Core.Asset.Execute()
            }),
        ]).Push()
        App.Next()
    }
    App.Core.Asset.DoStore = function (action) {
        switch (App.Core.Asset.Asset.StoreType) {
            case "rbz":
                App.Commands([
                    App.NewCommand("to", App.Options.NewWalk("yz-rbz")),
                    App.NewCommand("do", "dang " + App.Core.Asset.Asset.UNID),
                    App.NewCommand("nobusy"),
                    App.NewCommand("function", function () {
                        App.Core.Asset.Execute()
                    }),
                ]).Push()
                App.Next()
                break
            case "pack":
                App.Commands([
                    App.NewCommand("function",App.LeaveLimitedRoom),
                    App.NewCommand("do", "pack " + App.Core.Asset.Asset.UNID),
                    App.NewCommand("nobusy"),
                    App.NewCommand("function", function () {
                        App.Core.Asset.Execute()
                    }),
                ]).Push()
                App.Next()
                break
            default:
                App.Commands([
                    App.NewCommand("to", App.Options.NewWalk("yzdp")),
                    App.NewCommand("do", "dang " + App.Core.Asset.Asset.UNID),
                    App.NewCommand("nobusy"),
                    App.NewCommand("function", function () {
                        App.Core.Asset.Execute()
                    }),
                ]).Push()
                App.Next()
                break
        }
    }
    App.Core.Asset.Process = function () {
        var v = App.Core.Asset.Valuation
        var asset = App.Core.Asset.Asset
        for (var k = 0; k < v.Actions.length; k++) {
            var action = v.Actions[k]
            if ((action.Strategy == "" || action.Strategy == App.Core.Asset.Valuation.Strategy) && App.Core.Asset.ProcessCommand[action.Command] && action.Filter.Filter(asset)) {
                if (!App.Core.Asset.CheckCondition(action, asset)) {
                    continue
                }
                if (action.Command == "#carry") {
                    break
                }
                if (action.Command == "#sell" && action.Param) {
                    if (asset.Count <= (action.Param - 0)) {
                        continue
                    }
                }
                Note(action.Line)
                switch (action.Command) {
                    case "#sell":
                        App.Core.Asset.DoSell(action)
                        return
                    case "#keep":
                        App.Core.Asset.DoKeep(action)
                        return
                    case "#drop":
                        App.Core.Asset.DoDrop(action)
                        return
                    case "#store":
                        App.Core.Asset.DoStore(action)
                        return
                }
            }
        }
        App.Core.Asset.Valuation.Index = App.Core.Asset.Valuation.Index + 1
        App.Core.Asset.Execute()
    }
    App.RegisterCallback("core.asset.item", function () {
        while (App.Core.Asset.Valuation.Index < App.Data.ItemList.Items.length) {
            if (App.Data.ItemList.Items[App.Core.Asset.Valuation.Index].Binded) {
                App.Core.Asset.Valuation.Index = App.Core.Asset.Valuation.Index + 1
            } else {
                break
            }
        }
        if (App.Core.Asset.Valuation.Index < App.Data.ItemList.Items.length) {
            let item = App.Data.ItemList.Items[App.Core.Asset.Valuation.Index]
            let data = CNumber.Split(item.Label)
            let obj = {
                Binded: item.Binded,
                Equipped: item.Equipped,
                Name: data.Item,
                ID: item.ID,
                UNID: App.Core.Asset.Valuation.Index==0?App.Data.ItemList.ID:(App.Data.ItemList.ID + " " + (App.Core.Asset.Valuation.Index + 1)),
                Count: data.Count,
            }
            let asset = new Asset()
            for (var i = 0; i < App.Core.Asset.Valuings.length; i++) {
                App.Core.Asset.Valuings[i].Value(obj, asset)
            }
            App.Core.Asset.Asset = asset
            if (asset.NeedIdentify) {
                App.Send("jianding " + asset.UNID)
            }
            if (asset.NeedLook) {
                EnableTriggerGroup("core.asset.detailstart", true)
                App.Send("l " + asset.UNID)
                App.Response("asset", "look")
            } else {
                App.Core.Asset.Process()
            }

        } else {
            App.Core.Asset.Valuation.Assets.shift()
            App.Core.Asset.Valuation.Index = 0
            App.Core.Asset.Execute()
        }
    })
    App.Bind("Response.asset.item", "core.asset.item")
    App.RegisterCallback("core.asset.look", function () {
        EnableTriggerGroup("core.asset.detailstart", false)
        EnableTriggerGroup("core.asset.detail", false)
        App.Core.Asset.Process()
    })
    App.Bind("Response.asset.look", "core.asset.look")

    EnableTriggerGroup("core.asset.detailstart", false)
    EnableTriggerGroup("core.asset.detail", false)

    App.Core.Asset.OnAssetDetailStart = function (name, output, wildcards) {
        if (App.Core.Asset.Asset) {
            if (App.Core.Asset.Asset.Name == wildcards[0] && App.Core.Asset.Asset.ID == wildcards[1]) {
                EnableTriggerGroup("core.asset.detailstart", false)
                EnableTriggerGroup("core.asset.detail", true)
            }
        }
    }
    App.Core.Asset.OnAssetQuality = function (name, output, wildcards) {
        if (App.Core.Asset.Asset) {
            if (App.Core.Asset.Asset.Quality == -1) {
                switch (wildcards[0]) {
                    case "中品":
                        App.Core.Asset.Asset.Quality = 1
                        break
                    case "上品":
                        App.Core.Asset.Asset.Quality = 2
                        break
                    case "极品":
                        App.Core.Asset.Asset.Quality = 3
                        break
                    case "传说":
                        App.Core.Asset.Asset.Quality = 4
                        break
                    default:
                        App.Core.Asset.Asset.Quality = 0
                        break
                }
            }
        }
    }
    App.Core.Asset.OnAssetJianding = function (name, output, wildcards) {
        if (App.Core.Asset.Asset) {
            if (App.Core.Asset.Asset.Identified == -1) {
                switch (wildcards[0]) {
                    case "部分":
                        App.Core.Asset.Asset.Identified = 1
                        break
                    case "已":
                        App.Core.Asset.Asset.Identified = 2
                        break
                    default:
                        App.Core.Asset.Asset.Identified = 0
                        break
                }
            }
        }
    }
    App.Core.Asset.OnAssetHole = function (name, output, wildcards) {
        if (App.Core.Asset.Asset) {
            if (App.Core.Asset.Asset.Hole == -1) {
                App.Core.Asset.Asset.Hole = wildcards[0] - 0
            }
        }
    }
    App.Core.Asset.OnAssetValue = function (name, output, wildcards) {
        if (App.Core.Asset.Asset) {
            if (App.Core.Asset.Asset.Value == -1) {
                App.Core.Asset.Asset.Value = wildcards[0] - 0
            }
        }
    }
    App.Core.Asset.OnAssetEffect = function (name, output, wildcards) {
        if (App.Core.Asset.Asset) {
            App.Core.Asset.Asset.Effect[wildcards[0]] = true
        }
    }
    App.Core.Asset.RegisterValuing(new (Include("core/valuing/basic.js"))())
    App.Core.Asset.RegisterValuing(new (Include("core/valuing/pro.js"))())
    App.Core.Asset.RegisterValuing(new (Include("core/valuing/gem.js"))())
    App.Core.Asset.RegisterValuing(new (Include("core/valuing/random.js"))())
    App.Core.Asset.RegisterValuing(new (Include("core/valuing/probook.js"))())
    App.Core.Asset.RegisterValuing(new (Include("core/valuing/set.js"))())
    App.Core.Asset.RegisterValuing(new (Include("core/valuing/yu.js"))())

})(App)