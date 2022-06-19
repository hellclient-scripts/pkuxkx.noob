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
    App.RegisterCallback("App.Core.HUD.SetQuest", function (data) {
        App.Core.HUD.SetQuset(data)
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
            if (App.Core.HUD.Replies.length >= App.Core.HUD.QuestLength - 2) {
                App.Core.HUD.Replies = App.Core.HUD.Replies.slice(2 - App.Core.HUD.QuestLength)
            }
            for (var i = 0; i < App.Core.HUD.QuestLength - 2; i++) {
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
    App.Core.HUD.InitHUD = function () {
        App.Core.HUD.Mode = world.GetVariable("HUDMode")
        let line = JSON.parse(NewLine())
        let word = JSON.parse(NewWord("HUD面板 "))
        word.Bold = true
        word.Color = "Cyan"
        line.Words.push(word)
        switch (App.Core.HUD.Mode) {
            case "quest":
                SetHUDSize(10)
                word = JSON.parse(NewWord("任务简报"))
                word.Color = "Bright-White"
                line.Words.push(word)
                UpdateHUD(0, JSON.stringify([line]))
                App.Core.HUD.RenderQuest()
                break
            case "chat":
                word = JSON.parse(NewWord("聊天模式"))
                word.Color = "Bright-White"
                line.Words.push(word)
                SetHUDSize(App.Core.HUD.MaxChatHistory + 2)
                UpdateHUD(0, JSON.stringify([line]))
                UpdateHUD(1, JSON.stringify(App.Core.HUD.ChatHistory))
                break
            default:
                SetHUDSize(2)
                word = JSON.parse(NewWord("极简模式"))
                word.Color = "Bright-White"
                line.Words.push(word)
                UpdateHUD(0, JSON.stringify([line]))

        }
    }
    App.Core.HUD.InitHUD()

    App.Core.HUD.OnChat = function (name, output, wildcards) {
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
        List.append("note", "记录Note")
        List.append("morechat", "显示聊天历史")
        List.append("morequest", "显示任务历史")
        List.append("chat", "切换聊天模式")
        List.append("quest", "切换任务模式")
        List.append("simple", "切换极简模式")
        List.publish("App.Core.HUD.ChangeMode")
    })
    App.Core.HUD.OnNote = function (name, id, code, data) {
        if (code == 0 && data) {
            world.SetVariable("HUDNote", data)
            App.Core.HUD.RenderQuestLine(6)
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
                case "":
                case "chat":
                case "quest":
                case "simple":
                    world.SetVariable("HUDMode", data)
                    if (data == "quest") {
                        App.Send("i")
                    }
                    App.Core.HUD.InitHUD()
                    Userinput.Popup("", "修改生效", "修改已生效，记得保存你的设置")
                    break
            }
        }
    }
    if (world.GetVariable("HUDMode") == "") {
        Userinput.Popup("", "HUD模式", "你还没有选择您的HUD模式，点击HUD面板进行选择")
    }
})(App)