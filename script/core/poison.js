(function (App) {
    App.Core.Poison = {}
    App.Core.Poison.Poisons = {
        "苗疆瘴气": {
            "xuejie": true, "chan": true, "Exclude": function () {
                return App.Data.Score["family"] == "五毒教"
            }
        },
        "蛇毒": { "xuejie": true, "chan": true, "ping": true },
        "星宿毒掌毒": { "xuejie": true, "chan": true, "ping": true },
        "冰魄寒毒": { "xuejie": true, "chan": true, "ping": true },
        "生死符": { "xuejie": true, "chan": true, "ping": true },
        "凝血神爪毒": { "xuejie": true, "chan": true, "ping": true },
        "星宿火毒": { "chan": true },
        "白驼蛇毒": { "xuejie": true, "chan": true, "ping": true },
        "情毒": { "xuejie": true, "chan": true, "ping": true },
        "火焰刀": {},
    }
    App.Core.Poison.CurePingFail=function(){
        let type = App.Core.Poison.Poisons[App.Core.Poison.GetCurrent()]
        if (type["chan"] && (App.GetCash() > 10 || App.GetItemByName("朱睛冰蟾", true))) {
            App.Core.Poison.CureChan()
            return
        }
        App.Core.Poison.CureWait()
    }
    App.Core.Poison.Cure = function () {
        let type = App.Core.Poison.Poisons[App.Core.Poison.GetCurrent()]
        if (type["chan"] && !type["ping"] && !type["xuejie"] && (App.GetCash() > 10 || App.GetItemByName("朱睛冰蟾", true))) {
            App.Core.Poison.CureChan()
            return
        }
        if (type["ping"] && App.GetCash() >= 2) {
            App.Core.Poison.CurePing()
            return
        }
        App.Core.Poison.CureWait()
    }
    App.Core.Poison.GetCurrent = function () {
        for (var i in App.Core.Poison.Poisons) {
            if (App.Data.HP.status[i]) {
                if (App.Data.HP.status[i].Exclude && App.Data.HP.status[i].Exclude()) {
                    continue
                }
                return i
            }
        }
        return ""
    }
    App.Core.Poison.NeedFirstAid = function () {
        for (var i in App.Core.Poison.Poisons) {
            if (App.Data.HP.status[i]) {
                if (App.Data.HP.status[i].Exclude && App.Data.HP.status[i].Exclude()) {
                    continue
                }
                if (App.Core.Poison.Poisons[i]["xuejie"] && App.Data.HP.status["毒性压制"]) {
                    continue
                }
                return true
            }
        }
        return false
    }
    App.Core.Poison.NeedChan = function () {
        if (App.GetItemByName("朱睛冰蟾", true)) {
            for (var i in App.Core.Poison.Poisons) {
                if (App.Data.HP.status[i]) {
                    if (App.Data.HP.status[i].Exclude && App.Data.HP.status[i].Exclude()) {
                        continue
                    }
                    if (App.Core.Poison.Poisons[i]["xuejie"]) {
                        continue
                    }
                    if (!App.Core.Poison.Poisons[i]["chan"]) {
                        continue
                    }
                    return true
                }
            }
        }
        return false
    }
    App.Core.Poison.NeedXuejie = function () {
        if (App.Data.HP.status["毒性压制"]) {
            return false
        }
        for (var i in App.Core.Poison.Poisons) {
            if (App.Data.HP.status[i]) {
                if (App.Data.HP.status[i].Exclude && App.Data.HP.status[i].Exclude()) {
                    continue
                }
                if (App.Core.Poison.Poisons[i]["xuejie"]) {
                    return true
                }
            }
        }
        return false
    }
    App.Core.Poison.FirstAid = function () {
        if (App.Core.Poison.NeedFirstAid()) {
            if (App.GetItemNumber("xuejie dan", true)) {
                if (App.Core.Poison.NeedXuejie()) {
                    App.Commands([
                        App.NewCommand("do", "eat xuejie dan;i2"),
                        App.NewCommand("nobusy"),
                        App.NewCommand("function", App.Core.Poison.FirstAid)
                    ]).Push()
                    App.Next()
                    return
                }
            }
            App.Core.Poison.CureWait()
            return
        }
        App.Next()
    }
    App.Core.Poison.QuestionCure = App.Options.NewQuestion("ping yizhi", "cure", -1)

    let pingre = /^[^【：『]{1,10}：.+两黄金。$/
    let pinggoldre = /^平一指说道：共需诊金(\d+)两黄金。$/

    App.Core.Poison.CurePingNext = function () {
        let gold = 0
        for (var i = 0; i < App.Data.Ask.Replies.length; i++) {
            let line = App.Data.Ask.Replies[i]
            if (line == "平一指伸出右手，搭在你手腕上。" || line == "过了片刻，平一指缓缓对你说道：各项明细如下，") {
                continue
            }
            let result = line.match(pinggoldre)
            if (result) {
                Note("诊金" + result[1])
                gold = result[1] - 0
                break
            }
            if (line.match(pingre)) {
                continue
            }
            Note("问诊结束")
            break
        }
        var commands = []
        if (gold) {
            if (App.GetItemNumber("gold", true) >= gold) {
                commands.push(App.NewCommand("do", "give " + gold + " gold_money to ping yizhi;i2"))
            } else {
                commands.push(App.NewCommand("do", "give 1 cash to ping yizhi;i2"))
            }
            commands.push(App.NewCommand("nobusy"))
        }
        commands.push(App.NewCommand("function", App.Core.Poison.CureWait))
        App.Commands(commands).Push()
        App.Next()
    }
    App.Core.Poison.CurePing = function () {
        App.Commands([
            App.NewCommand("to", App.Options.NewWalk("yzyp")),
            App.NewCommand("nobusy"),
            App.NewCommand("ask", App.Core.Poison.QuestionCure,"","core.state.ping.pingfail"),
            App.NewCommand("nobusy"),
            App.NewCommand("function", App.Core.Poison.CurePingNext)
        ]).Push()
        App.Next()

    }
    App.Core.Poison.CureChan = function () {
        App.Commands([
            App.NewCommand("item", App.Options.NewItem("chan")),
            App.NewCommand("do", "eat chan;i2"),
            App.NewCommand("nobusy"),
            App.NewCommand("function", App.Core.Poison.CureWait)
        ]).Push()
        App.Next()
    }
    App.Core.Poison.CureWait = function () {
        var commands = []
        if (App.Core.PerQixue() < App.GetNumberParam("heal_below") || App.Core.PerJing() < App.GetNumberParam("heal_below")) {
            if (App.Core.PerJing() > App.Core.PerQixue()) {
                commands.push(App.NewCommand("do", "yun heal;hp"))
            } else {
                commands.push(App.NewCommand("do", "yun inspire;hp"))
            }
        } else {
            commands.push(App.NewCommand("do", "dazuo " + App.GetNumberParam("poison_dazuo_num")))
        }
        commands.push(App.NewCommand("nobusy"))
        App.Commands(commands).Push()
        App.Next()
    }
    App.RegisterState(new (Include("core/state/poison/pingfail.js"))())

})(App)