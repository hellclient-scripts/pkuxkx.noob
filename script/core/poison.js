(function (App) {
    App.Core.Poison = {}
    App.Core.Poison.Poisons = {
        "苗疆瘴气": { "xuejie": true, "chan": true },
        "蛇毒": { "xuejie": true, "chan": true, "ping": true },
        "星宿毒掌毒": { "xuejie": true, "chan": true, "ping": true },
        "冰魄寒毒": { "xuejie": true, "chan": true, "ping": true },
        "生死符": { "xuejie": true, "chan": true, "ping": true },
    }
    App.Core.Poison.Cure = function () {
        let type = App.Core.Poison.Poisons[App.Core.Poison.GetCurrent()]
        if (type["ping"] && App.GetCash() > 5) {
            App.Core.Poison.CurePing()
            return
        }
        if (type["chan"] && App.GetCash() > 10) {
            App.Core.Poison.CureChan()
            return
        }
        App.Core.Poison.CureWait()
    }
    App.Core.Poison.GetCurrent = function () {
        for (var i in App.Core.Poison.Poisons) {
            if (App.Data.HP.status[i]) {
                return i
            }
        }
        return ""
    }
    App.Core.Poison.NeedFirstAid = function () {
        for (var i in App.Core.Poison.Poisons) {
            if (App.Data.HP.status[i]) {
                if (App.Core.Poison.Poisons[i]["xuejie"] && App.Data.HP.status["毒性压制"]) {
                    continue
                }
                return true
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
                if (App.Core.Poison.Poisons[i]["xuejie"]) {
                    return true
                }
            }
        }
        return false
    }
    App.Core.Poison.FirstAid = function () {
        if (App.Core.Poison.NeedFirstAid) {
            if (App.GetItemNumber("xuejie dan", true)) {
                if (App.Core.Poison.NeedXuejie()) {
                    App.Commands([
                        App.NewCommand("do", "eat xuejie dan;i2"),
                        App.NewCommand("nobusy"),
                        App.NewCommand("function".App.Core.Poison.FirstAid)
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
    App.Core.Poison.QuestionCore = App.Options.NewQuestion("ping yizhi", "cure", -1)

    let pingre = /^[^【：『]{1,10}：.+两黄金。$/
    let pinggoldre = /^平一指说道：共需诊金(\d+)两黄金。$/

    App.Core.Poison.CurePingNext = function () {
        let gold = 0
        for (var i = 0; i < App.Data.Ask.Replies; i++) {
            let line = App.Data.Ask.Replies[i]
            if (line == "平一指伸出右手，搭在你手腕上。" || line == "过了片刻，平一指缓缓对你说道：各项明细如下，") {
                continue
            }
            if (line.match(pingre)) {
                continue
            }
            let result = line.match(pinggoldre)
            if (result) {
                gold = result[1] - 0
                break
            }
            break
        }
        var commands = []
        if (gold) {
            if (App.GetItemNumber("gold", true) > gold) {
                commands.push("do", "give " + gold + " to ping yizhi;i2")
            } else {
                commands.push("do", "give 1 cash to ping yizhi;i2")
            }
            commands.push("nobusy")
        }
        commands.push(App.NewCommand("function".App.Core.Poison.CureWait))
        App.Next()
    }
    App.Core.Poison.CurePing = function () {
        App.Commands([
            App.NewCommand("to", App.Options.NewWalk("yzyp")),
            App.NewCommand("nobusy"),
            App.NewCommand("ask", App.Core.Poison.QuestionCore),
            App.NewCommand("nobusy"),
            App.NewCommand("function".App.Core.Poison.CurePingNext)
        ]).Push()
        App.Next()

    }
    App.Core.Poison.CureChan = function () {
        App.Commands([
            App.NewCommand("item", App.Options.NewItem("chan")),
            App.NewCommand("do", "eat chan;i2"),
            App.NewCommand("nobusy"),
            App.NewCommand("function".App.Core.Poison.CureWait)
        ]).Push()
        App.Next()
    }
    App.Core.Poison.CureWait = function () {
        var commands = []
        if (App.Core.PerQixue() < App.GetNumberParam("heal_below")) {
            commands.push(App.NewCommand("do", "yun heal"))
        } else if (App.Core.PerJing() < App.GetNumberParam("heal_below")) {
            commands.push(App.NewCommand("do", "yun inspire"))
        } else {
            commands.push(App.NewCommand("do", "dazuo " + App.GetNumberParam("poison_dazuo_num")))
        }
        commands.push(App.NewCommand("nobusy"))
        App.Commands(commands).Push()
        App.Next()
    }


    // 你向平一指打听有关『cure』的消息。
    // 平一指伸出右手，搭在你手腕上。
    // 过了片刻，平一指缓缓对你说道：各项明细如下，
    // 星宿毒掌之毒：二两黄金。
    // 平一指说道：共需诊金2两黄金。
})(App)