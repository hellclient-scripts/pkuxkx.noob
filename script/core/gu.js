(function (App) {
    let check = Include("core/check/check.js")
    let Action = Include("include/action.js")

    App.Core.Gu = {}
    App.Core.Gu.Guhe = function () {
        if (App.GetItemByName("如意盒")) {
            return "ruyi he"
        }
        return ""
    }
    App.Core.Gu.List = []
    App.Core.Gu.Reset = function (name, output, wildcards) {
        App.Core.Gu.List = []
    }
    App.Core.Gu.OnItem = function (name, output, wildcards) {
        let item = {
            Index: wildcards[0],
            Name: wildcards[1],
            ID: wildcards[2].toLowerCase(),
            Type: wildcards[3],
            Alias: wildcards[4].trim(),
            Level: wildcards[5] - 0,
            JingXue: wildcards[6] - 0,
            AP: wildcards[7],
            APCap: wildcards[8],
        }
        App.Core.Gu.List.push(item)
    }
    App.Core.Gu.CheckGu = function () {
        let he = App.Core.Gu.Guhe()
        if (he) {
            let list = App.Core.Gu.GetFeedList()
            for (var i = 0; i < list.length; i++) {
                App.Send("so feed " + list[i])
            }
            App.Send("lookin " + he)
        }
    }
    let checkGu = (new check("gu")).WithLevel(App.CheckLevelFull).WithCommand(App.Core.Gu.CheckGu).WithIntervalParam("checkguinterval").WithLastID("LastGu")
    App.RegisterCallback("core.player.gu", checkGu.Callback())
    App.Bind("Check", "core.player.gu")

    App.Core.Gu.GetFeedList = function () {
        let result = {}
        if (App.Core.Gu.List.length == 0) {
            return []
        }
        let actions = App.Core.Gu.LoadActions(GetVariable("sorcery"))
        for (var i = 0; i < actions.length; i++) {
            let action = actions[i]
            if (action.Command == "" || action.Command == "feed") {
                let data = SplitN(action.Data.trim(), " ", 2)
                for (var k = 0; k < App.Core.Gu.List.length; k++) {
                    let gu = App.Core.Gu.List[k]
                    if (data.length < 2) {
                        if (gu.Level < (data[0] - 0)) {
                            result[gu.Alias || gu.Index] = true
                            continue
                        }
                    } else {
                        if (gu.Alias && gu.Alias == data[0] && gu.Level < (data[1] - 0)) {
                            result[gu.Alias] = true
                            continue
                        }
                    }
                }
            }
        }
        return Object.keys(result)
    }
    App.Core.Gu.LoadActions = function (data) {
        let lines = data.split("\n")
        let result = []
        for (var i = 0; i < lines.length; i++) {
            let line = lines[i].trim()
            if (line) {
                let action = new Action(line)
                result.push(action)
            }
        }
        return result
    }
    App.Core.Gu.Feed = function () {
        if ((!checkGu.InCooldown()) && App.Core.Gu.GetFeedList().length > 0) {
            App.Core.Gu.CheckGu()
            checkGu.ResetCooldown()
        }
    }
    App.RegisterCallback("core.gu.feed", App.Core.Gu.Feed)
    App.Bind("move.beforeonstep", "core.gu.feed")
    App.Bind("quests.loop", "core.gu.feed")
})(App)