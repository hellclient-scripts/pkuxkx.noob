(function (App) {
    App.Core.HUD = {}
    App.Core.HUD.Mode = "0"//"":聊天模式,"simple":极简模式,"quest"2:任务简报
    App.Core.HUD.QuestLog = []
    App.Core.HUD.MaxQuestLog = 500
    App.Core.HUD.ChatLog = []
    App.Core.HUD.MaxChatLog = 500

    App.Core.HUD.ChatHistory = []
    App.Core.HUD.MaxChatHistory = 16
    App.Core.HUD.Avatar = []
    App.Core.HUD.QuestLength = 9
    App.Core.HUD.NoAvatar = true
    App.Core.HUD.ReplyIgnoreQuestions = { "success": true, "cancel": true, "下山": true, "炼丹": true }
    App.Core.HUD.ReplyIgnoreNPCs = {}
    App.Core.HUD.Replies = []
    msk1 = JSON.parse(NewWord("  "))
    msk1.Background = "White"
    msk2 = JSON.parse(NewWord("  "))
    msk2.Background = "Black"
    for (let i = 0; i < 8; i++) {
        App.Core.HUD.Avatar[i] = JSON.parse(NewLine())
        if (i % 2 == 0) {
            App.Core.HUD.Avatar[i] = [msk1, msk2, msk1, msk2, msk1, msk2]
        } else {
            App.Core.HUD.Avatar[i] = [msk2, msk1, msk2, msk1, msk2, msk1]
        }
    }
    let wordCurrentQuestManual = JSON.parse(NewWord("待命"))
    wordCurrentQuestManual.Color = "Bright-Green"
    let wordCurrentQuest = JSON.parse(NewWord("当前任务:"))
    wordCurrentQuest.Color = "Bright-Cyan"
    let wordCurrentNoQuest = JSON.parse(NewWord("没有任务。"))
    wordCurrentNoQuest.Color = "Bright-Cyan"
    let wordQuestNote = JSON.parse(NewWord("备注:    "))
    wordQuestNote.Color = "Bright-Yellow"
    App.Core.HUD.CurrentQuest = ""
    App.Core.HUD.SetQuset = function (str) {
        App.Core.HUD.CurrentQuest = str
        if (App.Core.HUD.Mode == "quest") {
            App.Core.HUD.RenderQuestLine(App.Core.HUD.QuestLength - 2)
        }
    }
    App.RegisterCallback("App.Core.HUD.ZhangSan", function (data) {
        let output = App.Data.Room.Name + "[" + App.Data.Room.ID + "] " + data
        App.Core.HUD.SetNote(output)
    })
    App.Bind("core.zhangsan", "App.Core.HUD.ZhangSan")
    App.RegisterCallback("App.Core.HUD.SetQuest", function (data) {
        App.Core.HUD.SetQuset(data)
        App.Core.HUD.Summary()
    })
    App.Bind("quest.set", "App.Core.HUD.SetQuest")
    App.RegisterCallback("App.Core.HUD.OnReply", function () {
        if (App.Core.HUD.ReplyIgnoreQuestions[App.Data.Ask.Question] || App.Core.HUD.ReplyIgnoreNPCs[App.Data.Ask.NPC]) {
            return
        }
        if (App.Data.Ask.Replies.length == 1) {
            let output = (DumpOutput(1))
            App.Core.HUD.Replies.push(JSON.parse(output)[0].Words)
            App.Core.HUD.QuestLog.push(OutputToText(output))
            App.Core.HUD.QuestLog = App.Core.HUD.QuestLog.slice(-App.Core.HUD.QuestLogMax)
            if (App.Core.HUD.Replies.length >= App.Core.HUD.QuestLength - 3) {
                App.Core.HUD.Replies = App.Core.HUD.Replies.slice(3 - App.Core.HUD.QuestLength)
            }
            for (var i = 0; i < App.Core.HUD.QuestLength - 3; i++) {
                App.Core.HUD.RenderQuestLine(i)
            }
        }
    })
    App.Bind("core.reply", "App.Core.HUD.OnReply")
    App.Core.HUD.RenderQuestLine = function (i) {
        if (App.Core.HUD.Mode == "quest") {
            let line = JSON.parse(NewLine())
            let words = []
            if (i < 8) {
                words = words.concat(App.Core.HUD.Avatar[i])
            }
            switch (i) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    if (App.Core.HUD.Replies[i] != null) {
                        words.push(...App.Core.HUD.Replies[i])
                    }
                    break
                case 6:
                    words.push(wordQuestNote)
                    let note = world.GetVariable("HUDNote")
                    if (note) {
                        words.push(...JSON.parse(note))
                    }
                    break
                case 7:
                    if (App.Core.HUD.CurrentQuest) {
                        words.push(wordCurrentQuest, JSON.parse(NewWord(App.Core.HUD.CurrentQuest)))
                    } else {
                        words.push(wordCurrentNoQuest)
                    }

                    break
                case 8:
                    break
            }
            line.Words = words
            UpdateHUD(i + 1, JSON.stringify([line]))
        }
    }
    App.Core.HUD.RenderQuest = function () {
        if (App.Core.HUD.Mode == "quest") {
            for (let i = 0; i < 9; i++) {
                App.Core.HUD.RenderQuestLine(i)
            }
        }
    }

    App.Core.HUD.UpdateStatus = function () {
        let line = JSON.parse(NewLine())
        let word = JSON.parse(NewWord("Fullme剩余 "))
        word.Bold = true
        word.Color = "White"
        line.Words.push(word)
        word = JSON.parse(NewWord(""))
        let now = Now()
        if (App.Data.LastFullmeSuccess > 0) {
            let left = Math.floor((App.Data.LastFullmeSuccess + 3600000 - now) / 60000)
            if (left < 0) {
                word.Text = "已过期"
                word.Color = "Red"
            } else {
                word.Text = left + "分钟"
                word.Color = left < 20 ? "Yellow" : "Green"
            }
            word.Bold = true
        } else {
            word.Text = "-"
            word.Color = "white"
        }
        line.Words.push(word)
        word = JSON.parse(NewWord(" 下次Fullme "))
        word.Bold = true
        word.Color = "White"
        line.Words.push(word)
        word = JSON.parse(NewWord(""))
        if (App.Data.LastFullme > 0) {
            let left = Math.floor((App.Data.LastFullme + 900000 - now) / 60000)
            if (left < 0) {
                word.Text = "随时"
                word.Color = "Green"
            } else {
                word.Text = left + "分钟"
                word.Color = "Yellow"
            }
            word.Bold = true
        } else {
            word.Text = "-"
            word.Color = "white"
        }
        line.Words.push(word)
        if (App.Core.Afk.IsTurbo()) {
            word = JSON.parse(NewWord(""))
            word.Text = " "
            line.Words.push(word)
            word = JSON.parse(NewWord(""))
            word.Text = "超频(" + Math.round((App.Core.Afk.TurboBefore - Now()) / 60000) + "m)"
            word.Color = "White"
            word.Background = "Green"
            line.Words.push(word)
        } else if (App.Data.Afk) {
            word = JSON.parse(NewWord(""))
            word.Text = " "
            line.Words.push(word)
            word = JSON.parse(NewWord(""))
            word.Text = "暂离"
            word.Color = "White"
            word.Background = "Red"
            line.Words.push(word)
        }
        word = JSON.parse(NewWord(" 水温 "))
        line.Words.push(word)
        word = JSON.parse(NewWord(""))
        word.Text = "" + App.Core.Overheat.Value
        word.Bold = true
        word.Color = App.Core.Overheat.IsOverThreshold() ? "Red" : "Green"
        line.Words.push(word)
        UpdateHUD(GetHUDSize() - 1, JSON.stringify([line]))
    }
    App.RegisterCallback("core.hud.Update", App.Core.HUD.UpdateStatus)

    App.Bind("HUDUpdate", "core.hud.Update")
    App.Bind("core.overheat.updated", "core.hud.Update")
    App.Bind("ui.render.ticker", "core.hud.Update")

    App.Core.HUD.UpdateTitle = function () {
        let line = JSON.parse(NewLine())
        let word = JSON.parse(NewWord("HUD面板 "))
        word.Bold = true
        word.Color = "Cyan"
        line.Words.push(word)
        word = JSON.parse(NewWord(GetModeName() + " "))
        word.Color = "Bright-White"
        line.Words.push(word)
        word = JSON.parse(NewWord(App.Core.ShoppingMode.Current().ID + " "))
        word.Color = "Bright-Green"
        line.Words.push(word)
        word = JSON.parse(NewWord(App.Core.CombatMode.Current().ID + " "))
        word.Color = "Bright-Green"
        line.Words.push(word)
        word = JSON.parse(NewWord(App.Core.OverheatMode.Current().ID + " "))
        word.Color = "Bright-Green"
        line.Words.push(word)
        word = JSON.parse(NewWord(App.Core.GameMode.Current().ID + " "))
        word.Color = "Bright-Green"
        line.Words.push(word)
        UpdateHUD(0, JSON.stringify([line]))
    }
    let GetModeName = function () {
        switch (App.Core.HUD.Mode) {
            case "quest":
                return "任务简报"
                break
            case "chat":
                return "任务简报"
                break
            default:
                return "极简模式"
                break
        }
    }
    App.Core.HUD.InitHUD = function () {
        App.Core.HUD.Mode = world.GetVariable("HUDMode")
        switch (App.Core.HUD.Mode) {
            case "quest":
                SetHUDSize(10)
                App.Core.HUD.UpdateTitle()
                App.Core.HUD.RenderQuest()
                break
            case "chat":
                SetHUDSize(App.Core.HUD.MaxChatHistory + 2)
                App.Core.HUD.UpdateTitle()
                UpdateHUD(1, JSON.stringify(App.Core.HUD.ChatHistory))
                break
            default:
                SetHUDSize(2)
                App.Core.HUD.UpdateTitle()
                break
        }
        App.Core.HUD.UpdateStatus()
    }
    App.Core.HUD.InitHUD()
    var blockedchannels = {
        "任务": true,
        "本地": true,
        "江湖": true,
        "区域": true,
        "求助": true,
    }
    App.Core.HUD.OnChat = function (name, output, wildcards) {
        if (blockedchannels[wildcards[0]]) {
            return
        }
        App.Core.HUD.ChatHistory = App.Core.HUD.ChatHistory.concat(JSON.parse(DumpOutput(1)))
        if (App.Core.HUD.ChatHistory.length > App.Core.HUD.MaxChatHistory) {
            App.Core.HUD.ChatHistory = App.Core.HUD.ChatHistory.slice(-App.Core.HUD.MaxChatHistory)
        }
        App.Core.HUD.ChatLog.push(output)
        App.Core.HUD.ChatLog = App.Core.HUD.ChatLog.slice(-App.Core.HUD.MaxChatLog)

        if (App.Core.HUD.Mode == "chat") {
            UpdateHUD(1, JSON.stringify(App.Core.HUD.ChatHistory))
        }
    }
    App.Core.HUD.OnAvatarStart = function (name, output, wildcards) {
        App.Core.HUD.Avatar = []
        world.EnableTriggerGroup("hud.avart", true)
    }
    App.Core.HUD.OnAvatar = function (name, output, wildcards) {
        let line = JSON.parse(DumpOutput(1))[0]
        let words = []
        let Catch = 0
        line.Words.forEach(function (word) {
            switch (Catch) {
                case 1:
                    if (word.Text == "[") {
                        Catch = 2
                        return
                    }
                    words.push(word)
                    break
                case 0:
                    if (word.Text == "]") {
                        Catch = 1
                    }
                    break
            }
        });
        App.Core.HUD.Avatar.push(words)
    }
    App.Core.HUD.OnAvatarEnd = function (name, output, wildcards) {
        world.EnableTriggerGroup("hud.avart", false)
        App.Core.HUD.RenderQuest()
    }
    world.EnableTriggerGroup("hud.avart", false)
    App.Bind("onHUDClick", "App.Core.HUD.OnClick")
    App.RegisterCallback("App.Core.HUD.OnClick", function (click) {
        var List = Userinput.newlist("类型", "更改HUD类型", false)
        List.append("chat", "切换聊天模式")
        List.append("quest", "切换任务模式")
        List.append("simple", "切换极简模式")
        List.append("morechat", "显示聊天历史")
        List.append("morequest", "显示任务历史")
        List.append("note", "记录Note")
        List.append("shoppingmode", "改变消费模式")
        List.append("combatmode", "改变战斗模式")
        List.append("overheatmode", "改变过热模式")
        List.append("gamemode", "改变游戏模式")
        List.publish("App.Core.HUD.ChangeMode")
    })
    App.Core.HUD.SetNote = function (data) {
        App.SetVariable("HUDNote", data)
        App.Core.HUD.RenderQuestLine(6)

    }
    App.Core.HUD.OnNote = function (name, id, code, data) {
        if (code == 0 && data) {
            App.Core.HUD.SetNote(data)
        }
    }
    App.Core.HUD.ShowChatLog = function () {
        let log = App.Core.HUD.ChatLog.join("\n")
        Userinput.Note("", "聊天日志", log)
    }
    App.Core.HUD.ShowQuestLog = function () {
        let log = App.Core.HUD.QuestLog.join("\n")
        Userinput.Note("", "任务日志", log)
    }
    App.Core.HUD.ChangeMode = function (name, id, code, data) {
        if (code == 0) {
            switch (data) {
                case "note":
                    var List = Userinput.newlist("记录", "选择你要记录的文字", false)
                    let output = JSON.parse(DumpOutput(20))
                    output.forEach(function (line) {
                        List.append(JSON.stringify(line.Words), OutputToText(JSON.stringify([line])))
                    })
                    List.publish("App.Core.HUD.OnNote")
                    break
                case "morechat":
                    App.Core.HUD.ShowChatLog()
                    break
                case "morequest":
                    App.Core.HUD.ShowQuestLog()
                    break
                case "combatmode":
                    App.Core.HUD.PickCombatMode()
                    break
                case "shoppingmode":
                    App.Core.HUD.PickShoppingMode()
                    break
                case "overheatmode":
                    App.Core.HUD.PickOverheatMode()
                    break
                case "gamemode":
                    App.Core.HUD.PickGameMode()
                    break
                case "chat":
                case "quest":
                case "simple":
                    App.SetVariable("HUDMode", data)
                    if (data == "quest") {
                        App.Send("i")
                    }
                    App.Core.HUD.InitHUD()
                    break
            }
        }
    }
    if (world.GetVariable("HUDMode") == "") {
        Userinput.Popup("", "HUD模式", "你还没有选择您的HUD模式，点击HUD面板进行选择")
    }
    App.Core.HUD.PickCombatMode = function () {
        var list = Userinput.newlist("请选择你要设置战斗模式", "战斗模式决定了机器一些战斗计算使用用的的参数")
        list.append("手无寸铁", "手无寸铁：尽可能的避免一切战斗，Wimpy85,新ID刚拜师没技能选择这个")
        list.append("身强体壮", "身强体壮：避免可能战斗，Wimpy50,学了技能带没Full选这个")
        list.append("外门弟子", "外门弟子：会接普通战斗任务，Wimpy40,Full了技能选这个")
        list.append("核心弟子", "核心弟子：会接危险战斗任务，Wimpy30,有强力技能组合后选这个")
        list.publish("App.Core.HUD.OnCombatMode")
    }
    if (world.GetVariable("combat_mode") == "") {
        Userinput.Popup("App.Core.HUD.PickCombatMode", "战斗模式", "你还没有选择您的战斗模式，点击HUD面板进行选择")
    }
    App.Core.HUD.PickShoppingMode = function () {
        var list = Userinput.newlist("请选择你要设置消费模式", "消费模式决定了机器一些消费计算使用用的的参数")
        list.append("一穷二白", "一穷二白：默认gold_min为0,不坐任何交通工具，会从成都翻山过长江，不买吃喝")
        list.append("仅够温饱", "仅够温饱：默认gold_min为1,会坐船")
        list.append("中产阶级", "中产阶级：默认gold_min为10,会坐车去偏远的地方")
        list.append("土豪阶级", "土豪阶级：默认gold_min为100,较近的地方也会坐车")
        list.publish("App.Core.HUD.OnShoppingMode")
    }
    if (world.GetVariable("shopping_mode") == "") {
        Userinput.Popup("App.Core.HUD.PickShoppingMode", "消费模式", "你还没有选择您的消费模式，点击HUD面板进行选择")
    }
    App.Core.HUD.PickOverheatMode = function () {
        var list = Userinput.newlist("请选择你要设置过热模式", "过热模式决定了高强度运行后怎么对行为进行限制")
        list.append("死宅男", "死宅男：过热时会休息30秒，不会进入高速移动")
        list.append("体校生", "体校生:过热不会休息，但也不会进入高速移动")
        list.append("磕药的", "磕药的：无视过热")
        list.publish("App.Core.HUD.OnOverheatMode")
    }
    App.Core.HUD.PickGameMode = function () {
        var list = Userinput.newlist("请选择你要设置游戏模式", "游戏模式决定了Fullme冷却和其他游戏节奏的设置")
        list.append("随意", "随意：一切采用默认值")
        list.append("急性子", "急性子：Fullme cd 15分钟")
        list.append("休闲", "休闲:Fullme cd 30分钟")
        list.append("懒鬼", "休闲:Fullme cd 59分钟")
        list.publish("App.Core.HUD.OnGameMode")
    }

    App.Core.HUD.OnCombatMode = function (name, id, code, data) {
        if (code == 0 && data) {
            App.SetVariable("combat_mode", data)
            App.Core.HUD.UpdateTitle()
        }
    }
    App.Core.HUD.OnShoppingMode = function (name, id, code, data) {
        if (code == 0 && data) {
            App.SetVariable("shopping_mode", data)
            App.Core.HUD.UpdateTitle()
        }
    }
    App.Core.HUD.OnOverheatMode = function (name, id, code, data) {
        if (code == 0 && data) {
            App.SetVariable("overheat_mode", data)
            App.Core.HUD.UpdateTitle()
        }
    }
    App.Core.HUD.OnGameMode = function (name, id, code, data) {
        if (code == 0 && data) {
            App.SetVariable("game_mode", data)
            App.Core.HUD.UpdateTitle()
        }
    }

    let summaryLabelSep=JSON.parse(NewWord(" "))
    let summaryLabelHourexp= JSON.parse(NewWord("效率:"))
    let summaryLabelOverHeat= JSON.parse(NewWord("水温:"))
    let summaryLabelFullme= JSON.parse(NewWord("福米:"))
    let summaryLabelAfk= JSON.parse(NewWord("暂离:"))
    let summaryLabelLoad= JSON.parse(NewWord("负重:"))


    App.Core.HUD.Summary = function () {
        var line1 = JSON.parse(NewLine())
        let words1 = []
        if (GetPriority()>0&&App.Core.HUD.WarningMessage){
            let wordpriority=JSON.parse(NewWord(App.Core.HUD.WarningMessage))
            wordpriority.Bold=true
            wordpriority.Color="Red"
            words1.push(wordpriority)
            words1.push(summaryLabelSep)
        }

        if (App.CurrentStateID() == "manual") {
            words1.push(wordCurrentQuestManual)
        } else if (App.Core.HUD.CurrentQuest) {
            words1.push(wordCurrentQuest)
            words1.push(JSON.parse(NewWord(App.Core.HUD.CurrentQuest)))
        } else {
            words1.push(wordCurrentNoQuest)
        }
        line1.Words = words1
        var line2 = JSON.parse(NewLine())
        let words2 = []
        words2.push(summaryLabelHourexp)
        let wordhourxp=JSON.parse(NewWord(FormatNumber(App.Data.HourExp)))
        wordhourxp.Bold=true
        wordhourxp.Color=(App.Data.HourExp>=0)?"Green":"Red"
        words2.push(wordhourxp)
        words2.push(summaryLabelSep)

        words2.push(summaryLabelOverHeat)
        let wordoverheat=JSON.parse(NewWord(App.Core.Overheat.Value))
        wordoverheat.Bold=true
        wordoverheat.Color=App.Core.Overheat.IsOverThreshold() ? "Red" : "Green"
        words2.push(wordoverheat)
        words2.push(summaryLabelSep)

        words2.push(summaryLabelFullme)
        let now = Now()
        let wordfullme=JSON.parse(NewWord(""))
        if (App.Data.LastFullmeSuccess > 0) {
            let left = Math.floor((App.Data.LastFullmeSuccess + 3600000 - now) / 60000)
            if (left < 0) {
                wordfullme.Text = "无"
                wordfullme.Color = "Red"
            } else {
                wordfullme.Text = left+""
                wordfullme.Color = left < 20 ? "Yellow" : "Green"
            }
            wordfullme.Bold = true
        } else {
            wordfullme.Text = "-"
            wordfullme.Color = "white"
        }
        words2.push(wordfullme)
        words2.push(summaryLabelSep)

        words2.push(summaryLabelAfk)
        let wordafk=JSON.parse(NewWord(App.Data.Afk?"是":"否"))
        wordafk.Color=(!App.Data.Afk)?"Green":"Red"
        words2.push(wordafk)
        words2.push(summaryLabelSep)

        words2.push(summaryLabelLoad)
        let wordload=JSON.parse(NewWord(App.Data.Load))
        wordafk.Color=(App.Data.Load<50)?"Green":"Red"
        words2.push(wordload)
        words2.push(summaryLabelSep)
    

        line2.Words=words2
        SetSummary(JSON.stringify([line1,line2]))
    }
    App.Core.HUD.WarningMessage=""
    App.RegisterCallback("core.hud.summary", App.Core.HUD.Summary)
    App.Bind("ui.render.ticker", "core.hud.summary")
    App.Bind("manual", "core.hud.summary")
    App.Core.HUD.Summary()

})(App)