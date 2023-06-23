(function (App) {
    App.Core.Weapon = {}
    let check = Include("core/check/check.js")
    let Action = Include("include/action.js")
    App.Core.Weapon.Weapons = 0
    App.Core.Weapon.Equipped = {}
    App.Core.Weapon.EquippedChecking = {}
    App.Core.Weapon.LastCheckEquipped = 0
    App.Core.Weapon.EquippedCheckInterval = 8000
    App.Core.Weapon.LoadActions = function (data) {
        let lines = data.split("\n")
        let result = []
        let defaultresult = []
        for (var i = 0; i < lines.length; i++) {
            let line = lines[i].trim()
            if (line) {
                let action = new Action(line)
                if (App.Core.Combat.Current != null && action.Strategy == App.Core.Combat.Current.Strategy) {
                    result.push(action)
                    continue
                }
                if (action.Strategy == "") {
                    defaultresult.push(action)
                }
            }
        }
        if (result.length == 0) {
            result = defaultresult
        }
        return result
    }

    App.Core.Weapon.Right = ""
    App.Core.Weapon.Left = ""
    App.Core.Weapon.ReWield = function () {
        App.Send("unwield all")
        App.Core.Weapon.Wield()
    }
    App.Core.Weapon.Send = function (action) {
        App.Send(action.Data)
    }
    App.Core.Weapon.Wield = function () {
        App.Core.Weapon.Right = ""
        App.Core.Weapon.Left = ""
        let actions = App.Core.Weapon.LoadActions(world.GetVariable("wield").trim())
        for (var i = 0; i < actions.length; i++) {
            let action = actions[i]
            switch (action.Command) {
                case "":
                    App.Core.Weapon.Send(action)
                    break
                case "#weapons":
                    App.Core.Weapon.Weapons = action.Data - 0
                    break
                case "#use":
                    App.Core.Weapon.ActionUse(action)
                    break
            }
        }
        App.Core.Weapon.CheckEquipped()
    }
    App.Core.Weapon.ToRepair = ""
    App.Core.Weapon.LastDurability = 0
    App.Core.Weapon.LastDurabilityMax = 0
    App.Core.Weapon.OnDurability = function (name, output, wildcards) {
        App.Core.Weapon.LastDurability = wildcards[0] - 0
        App.Core.Weapon.LastDurabilityMax = wildcards[1] - 0
    }
    App.RegisterCallback("core.weapon.durabilityend", function (data) {
        let param = data.split("#")
        Note("武器 " + param[1] + " 耐久度 " + (App.Core.Weapon.LastDurabilityMax > 0 ? App.Core.Weapon.LastDurability : "未知"))
        if (App.Core.Weapon.LastDurabilityMax > 0 && App.Core.Weapon.LastDurability < App.GetNumberParam("repair_below")) {
            App.Core.Weapon.ToRepair = data
        }
    })
    App.Core.Weapon.Check = function (type, id) {
        App.Core.Weapon.LastDurability = 0
        App.Core.Weapon.LastDurabilityMax = 0
        App.Send("l " + id)
        App.Response("wepon", "durability", type + "#" + id)
    }
    App.Core.Weapon.CheckRandom = function () {
        let repair_list = GetVariable("repair_list").trim()
        if (repair_list) {
            let list = repair_list.split("\n")
            App.Core.Weapon.Check(RandomList(list))
        }
    }
    App.Core.Weapon.LoadRepairList = function () {
        return App.Core.Weapon.LoadActions(world.GetVariable("repair_list").trim())
    }
    App.Core.Weapon.CheckAll = function () {
        let repair_list = App.Core.Weapon.LoadRepairList()
        if (repair_list.length) {
            for (var i = 0; i < repair_list.length; i++) {
                let action = repair_list[i]
                switch (action.Command) {
                    case "":
                    case "#fix":
                        Note("检查普通武器 " + action.Data)
                        App.Core.Weapon.Check("fix", action.Data)
                        break
                    case "#repair":
                        Note("检查绑定武器 " + action.Data)
                        App.Core.Weapon.Check("repair", action.Data)
                        break
                    case "#norepair":
                        break
                    default:
                        Note("未知的修理格式 " + action.Line)
                }
            }
        }
    }
    App.Core.Weapon.NeedWield = function () {
        return App.Core.Weapon.Weapons > Object.keys(App.Core.Weapon.Equipped).length
    }
    App.Core.Weapon.Use = function (id, type) {
        if (App.Core.Weapon.Equipped[id]) {
            App.Send("weapons use " + id + " as " + type)
        }
    }
    App.Core.Weapon.ActionUse = function (action) {
        if (action.Param && action.Data) {
            App.Core.Weapon.Use(action.Data, action.Param)
        }
    }

    App.Core.Weapon.OnCombat = function () {
        if (App.Core.Weapon.NeedWield()) {
            App.Core.Weapon.Wield()
            return
        }
        if (Now() > (App.Core.Weapon.LastCheckEquipped + App.Core.Weapon.EquippedCheckInterval)) {
            App.Core.Weapon.CheckEquipped()
        }
    }
    App.Core.Weapon.CheckEquipped = function () {
        // App.Core.Weapon.Equipped = {}
        App.Core.Weapon.EquippedChecking = {}
        let needcheck = {}
        let repair_list = App.Core.Weapon.LoadRepairList()
        if (repair_list.length) {
            for (var i = 0; i < repair_list.length; i++) {
                let action = repair_list[i]
                let data = action.Data.split(" ")
                if (!isNaN(data[data.length - 1])) {
                    data = data.slice(0, -1)
                }
                needcheck[data.join(" ")] = true
            }
        }
        let items = Object.keys(needcheck)
        if (items.length){
            App.Response("core","weaponcheck")
        }
        for (var i = 0; i < items.length; i++) {
            App.Core.Weapon.EquippedChecking[items[i]] = true
            App.Send("i " + items[i])
        }
        App.Core.Weapon.LastCheckEquipped = Now()
    }
    App.RegisterCallback("core.weapononcheck",function(){
        Note("检查武器装备情况")
        App.Core.Weapon.Equipped = {}
    })
    App.Bind("Response.core.weaponcheck", "core.weapononcheck")

    App.RegisterCallback("core.weapononitem", function (item) {
        if (App.Core.Weapon.EquippedChecking[App.Data.ItemList.ID]) {
            let id = App.Data.ItemList.ID
            if (item.Index != "1") {
                id = id + " " + item.Index
            }
            if (item.Equipped) {
                App.Core.Weapon.Equipped[id] = true
            } else {
                delete (App.Core.Weapon.Equipped[id])
            }
        }
    })
    App.Bind("core.onitemlist", "core.weapononitem")
    App.Bind("Response.wepon.durability", "core.weapon.durabilityend")
    App.Core.Weapon.Repair = function () {
        if (App.Core.Weapon.ToRepair != "") {
            let param = App.Core.Weapon.ToRepair.split("#")
            switch (param[0]) {
                case "fix":
                    App.Commands([
                        App.NewCommand("to", App.Options.NewWalk("yz-fds")),
                        App.NewCommand("do", "fix " + param[1]),
                        App.NewCommand("function", function () {
                            App.Core.Weapon.ToRepair = ""
                            App.Core.Weapon.CheckAll()
                            App.Next()
                        }),
                        App.NewCommand("nobusy"),
                    ]).Push()
                    break
                case "repair":
                    App.Commands([
                        App.NewCommand("to", App.Options.NewWalk("luoyang-dtp")),
                        App.NewCommand("do", "fix " + param[1]),
                        App.NewCommand("function", function () {
                            App.Core.Weapon.ToRepair = ""
                            App.Core.Weapon.CheckAll()
                            App.Next()
                        }),
                        App.NewCommand("nobusy"),
                    ]).Push()
                    break
                default:
                    throw "未知的修理指令" + App.Core.Weapon.ToRepair
            }
        }
        App.Next()
    }
    App.Bind("Check", "core.weapon.durability")
    let checkDurability = (new check("durability")).WithLevel(App.CheckLevelFull).WithCommand(App.Core.Weapon.CheckAll).WithIntervalParam("checkdurabilityinterval").WithLastID("LastDurability")
    App.RegisterCallback("core.weapon.durability", checkDurability.Callback())

}(App))