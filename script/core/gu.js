(function (App) {
    let check = Include("core/check/check.js")
    let Action = Include("include/action.js")
    const MinJingXue = 75
    const MaxYongGu = 5 * 60 * 1000
    App.Core.Gu = {}
    App.Core.Gu.Guhe = function () {
        if (App.GetItemByName("如意盒")) {
            return "ruyi he"
        }
        return ""
    }
    App.Core.Gu.Count = 0
    App.Core.Gu.List = []
    App.Core.Gu.Reset = function (name, output, wildcards) {
        App.Core.Gu.Count = 0
        if (App.Data.ItemList.ID == "undeaded") {
            App.Core.Gu.Count = App.Data.ItemList.Items.length
        }
        App.Core.Gu.List = []
    }
    App.Core.Gu.Put = function (check) {
        let offset = App.Core.Gu.Count - App.Core.Gu.List.length
        if (offset) {
            App.Send("shougu from "+world.GetVariable("id").trim())
            for (var i = 0; i < offset; i++) {
                App.Send("put undeaded in " + App.Core.Gu.Guhe())
            }
            if (check){
                App.Send("i undeaded;lookin " + he)
            }
        }
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
        App.Core.Gu.Count++
        App.Core.Gu.List.push(item)
    }
    App.Core.Gu.LastIn = 0
    App.Core.Gu.CheckGu = function () {
        let he = App.Core.Gu.Guhe()
        if (he) {
            if (!App.Core.Gu.NeedYonggu()) {
                if ((App.Core.Gu.Count - App.Core.Gu.List.length) && !App.Core.Gu.NeedYonggu()) {
                    App.Core.Gu.Put()
                }
            } else {
                App.Core.Gu.Yonggu()
                return
            }
            let list = App.Core.Gu.GetFeedList()
            if (!App.Core.Gu.NeedYonggu()) {
                if (!App.Core.Gu.FeedRoom || App.Core.Gu.FeedRoom == App.Data.Room.ID) {
                    if (App.Core.Gu.NoFeedRoom == "" || App.Core.Gu.NoFeedRoom !== App.Data.Room.ID) {
                        for (var i = 0; i < list.length; i++) {
                            App.Send("so feed " + list[i])
                        }
                    }
                }
            }
            App.Core.Gu.LastIn = Now()
            App.Send("i undeaded;lookin " + he)
        }
    }
    App.Core.Gu.Lookin = function () {
        let he = App.Core.Gu.Guhe()
        if (he) {
            App.Send("i undeaded;lookin " + he)
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
    App.Core.Gu.Env={}
    App.Core.Gu.Yonggu = function (env) {
        let he = App.Core.Gu.Guhe()
        if (he) {
            if (env){
                App.Core.Gu.Env=env
            }else{
                App.Core.Gu.Env={}
            }
            for (var i = 0; i < App.Core.Gu.YongguList.length; i++) {
                if (App.Core.Gu.GetJingXue(App.Core.Gu.YongguList[i].ID) >= MinJingXue) {
                    if (App.Core.Gu.CheckConditions(App.Core.Gu.YongguList[i].Action.Conditions)){
                        App.Send("yonggu " + App.Core.Gu.YongguList[i].ID)
                    }
                }
            }
            App.Send("i undeaded;lookin " + he)
        }
    }
    App.RegisterCallback("core.gu.oncombatready",function(){
        App.Core.Gu.Yonggu({"type":"combat"})
    })
    App.Bind("combat.ready","core.gu.oncombatready")
    App.RegisterCallback("core.gu.onmanual",function(data){
        App.Core.Gu.Put(true)
    })
    App.Bind("manual","core.gu.onmanual")

    App.Core.Gu.NeedYonggu = function () {
        if (Now() - App.Core.Gu.LastIn > MaxYongGu) {
            return false
        }
        if (App.Core.Gu.YongguList.length && App.Data.HP["per_qixue"] < 149) {
            return true
        }
        return false
    }
    App.Core.Gu.GetJingXue = function (id) {
        for (var k = 0; k < App.Core.Gu.List.length; k++) {
            let gu = App.Core.Gu.List[k]
            if (gu.Index == id || gu.Alias == id) {
                return gu.JingXue
            }
        }
        return 0
    }
    App.Core.Gu.YongguList = []
    App.Core.Gu.FeedRoom = ""
    App.Core.Gu.NoFeedRoom = ""
    App.Core.Gu.LoadActions = function (data) {
        let lines = data.split("\n")
        let result = []
        App.Core.Gu.YongguList = []
        for (var i = 0; i < lines.length; i++) {
            let line = lines[i].trim()
            if (line) {
                let action = new Action(line)
                switch (action.Command) {
                    case "#feedroom":
                        App.Core.Gu.FeedRoom = action.Data
                        break
                    case "#nofeedroom":
                        App.Core.Gu.NoFeedRoom = action.Data
                        break
                    case "#yonggu":
                        App.Core.Gu.YongguList.push({ "ID": action.Data,"Action":action})
                        break
                }
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
    App.Core.Gu.CheckConditions = function (conditions) {
        for (var i = 0; i < conditions.length; i++) {
            let condition = conditions[i]
            let checker = App.Core.Gu.Conditions[condition.Type]
            if (checker == null) {
                return false
            }
            if (checker(condition.Data) == condition.Exclude) {
                return false
            }
        }
        return true
    }
    App.Core.Gu.Conditions={}
    App.Core.Gu.Conditions["fullmeok"] = function (data) {
        let p=data -0
        if (p==NaN){
            p=0
        }
        return Before(App.Data.LastFullmeSuccess+60*60*1000-p*60*1000)
    }
    App.Core.Gu.Conditions["combat"] = function (data) {
        if (App.Core.Gu.Env.type !="combat"){
            return false
        }
        if (!App.Core.Combat.Current){
            return false
        }
        if (data){
            let strategies=data.split(",")
            for (var i=0;i<strategies.length;i++){
                if (App.Core.Combat.Current.Strategy==strategies[i]){
                    return true
                }
            }
            return false
        }
        return true
    }

    App.RegisterCallback("core.gu.feed", App.Core.Gu.Feed)
    App.Bind("move.beforeonstep", "core.gu.feed")
    App.Bind("core.looping", "core.gu.feed")
})(App)