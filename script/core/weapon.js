(function (App) {
    App.Core.Weapon = {}
    let check = Include("core/check/check.js")
    let Action = Include("include/action.js")
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
    App.Core.Weapon.Left = function (action) {

    }
    App.Core.Weapon.Right = function (action) {

    }
    App.Core.Weapon.End = function () {

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
                case "left":
                    App.Core.Weapon.Left(action)
                    break
                case "right":
                    App.Core.Weapon.Right(action)
                    break
            }
        }
    }
    App.Core.Weapon.ToRepair = ""
    App.Core.Weapon.LastDurability = 0
    App.Core.Weapon.LastDurabilityMax = 0
    App.Core.Weapon.OnDurability = function (name, output, wildcards) {
        App.Core.Weapon.LastDurability = wildcards[0] - 0
        App.Core.Weapon.LastDurabilityMax = wildcards[1] - 0
    }
    App.RegisterCallback("core.weapon.durabilityend", function (data) {
        let param=data.split("#")
        Note("武器 "+param[1]+" 耐久度 "+(App.Core.Weapon.LastDurabilityMax>0?App.Core.Weapon.LastDurability:"未知"))
        if (App.Core.Weapon.LastDurabilityMax > 0 && App.Core.Weapon.LastDurability < App.GetNumberParam("repair_below")) {
            App.Core.Weapon.ToRepair = data
        }
    })
    App.Core.Weapon.Check = function (type,id) {
        App.Core.Weapon.LastDurability = 0
        App.Core.Weapon.LastDurabilityMax = 0
        App.Send("l " + id)
        App.Response("wepon", "durability", type+"#"+id)
    }
    App.Core.Weapon.CheckRandom = function () {
        let repair_list = GetVariable("repair_list").trim()
        if (repair_list) {
            let list = repair_list.split("\n")
            App.Core.Weapon.Check(RandomList(list))
        }
    }
    App.Core.Weapon.LoadRepairList=function(){
        return App.Core.Weapon.LoadActions(world.GetVariable("repair_list").trim())
    }
    App.Core.Weapon.CheckAll = function () {
        let repair_list = App.Core.Weapon.LoadRepairList()
        if (repair_list.length) {
            for (var i=0;i<repair_list.length;i++){
                let action=repair_list[i]
                switch (action.Command){
                    case "":
                    case "#fix":
                        Note("检查普通武器 "+ action.Data)
                        App.Core.Weapon.Check("fix",action.Data)
                        break
                    case "#repair":
                        Note("检查绑定武器 "+ action.Data)
                        App.Core.Weapon.Check("repair",action.Data)
                    break
                    default:
                        Note("未知的修理格式 "+action.Line)
                }
            }
        }
    }
    App.Bind("Response.wepon.durability", "core.weapon.durabilityend")
    App.Core.Weapon.Repair = function () {
        if (App.Core.Weapon.ToRepair != "") {
            let param=App.Core.Weapon.ToRepair.split("#")
            switch (param[0]){
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
                    throw "未知的修理指令"+App.Core.Weapon.ToRepair
            }
        }
        App.Next()
    }
    App.Bind("Check", "core.weapon.durability")
    let checkDurability = (new check("durability")).WithLevel(App.CheckLevelFull).WithCommand(App.Core.Weapon.CheckAll).WithIntervalParam("checkdurabilityinterval").WithLastID("LastDurability")
    App.RegisterCallback("core.weapon.durability", checkDurability.Callback())

}(App))