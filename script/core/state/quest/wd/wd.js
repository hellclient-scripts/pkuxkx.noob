(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.quest.wd.wd"
        this.Groups = this.Groups.concat(["quest.wd"])
    }
    State.prototype = Object.create(basicstate.prototype)
    let re = /^(.*)\((.+)\)$/
    let Start = function (snap) {
        let output = App.Data.Ask.Lines[0]
        if (output.Words.length < 2) {
            App.Fail()
            return
        }
        switch (output.Words[1].Text) {
            case "说道：「武当派以真武七截阵闻名天下，每个拜入武当的入门弟子都需要学习阵法演练（zhenfa），":
                App.Quest.WD.Type = "zhen"
                break
            case "说道：「道家炼气最讲究时辰和地点了，现在正是采气的最佳时间。":
                App.Quest.WD.Type = "caiqi"
                break
            case "说道：「武当三侠最近迷上了炼丹，需要一个道童帮他看守丹炉，你到俞岱岩那里帮他看看炉火吧。":
                App.Quest.WD.Type = "liandan"
                break
            case "说道：「你已经很长时间没有fullme了，我看你是机器人吧！":
                App.Core.Quest.Cooldown("wd", 60000)
                App.Fail()
                return
            case "说道：「今天全派弟子要在":
                let label = output.Words[6].Text
                let data
                if (label[0] == "第") {
                    data = ["", CNumber.Convert(label.slice(1).split("章", 1)[0])]
                } else {
                    data = label.match(re)
                }
                App.Quest.WD.Type = "chanting"
                App.Quest.WD.Data = {
                    Location: output.Words[2].Text,
                    Book: output.Words[4].Text,
                    Label: data[1],
                    Section: data[2] - 0,
                }
                break
            case "说道：「山下双井子村的崔老汉似乎有点麻烦，你现在下山一趟帮他解决麻烦。":
                App.Quest.WD.Type = "xiake"
                break
            default:
                App.Core.Quest.Cooldown("wd", 30000)
                App.Fail()
                return
        }
        App.Core.Snapshot.Rollback(snap)
        App.Core.Puzzle.Show("wd.start", "选择任务", "选择下一步的操作", DumpOutput(1), App.Quest.WD.Items)
    }
    State.prototype.OnEvent = function (context, event, data) {
        switch (event) {
            case "puzzle.answer":
                if (App.Data.Puzzle.Answer == App.Quest.WD.Type) {
                    switch (App.Data.Puzzle.Answer) {
                        case "zhen":
                            App.Quest.WD.Zhen.Start()
                            return;
                        case "caiqi":
                            App.Quest.WD.Caiqi.Start()
                            return
                        case "liandan":
                            App.Quest.WD.Liandan.Start()
                            return
                        case "chanting":
                            App.Quest.WD.Chanting.Start(App.Quest.WD.Data.Location, App.Quest.WD.Data.Book, App.Quest.WD.Data.Label, App.Quest.WD.Data.Section)
                            return
                        case "xiake":
                            App.Quest.WD.Xiake.Start()
                            return
                    }
                }
                App.Fail()
        }
    }
    State.prototype.Enter = function (context, oldstatue) {
        App.Quest.WD.Zhen.Dir = RandomKey(App.Quest.WD.Zhen.Locations)
        App.Quest.WD.Zhen.Back = App.Quest.WD.Zhen.Locations[App.Quest.WD.Zhen.Dir]
        App.Quest.WD.Data = {
            Type: ""
        }
        let snap=App.Core.Snapshot.Take("start")
        App.Commands([
            App.NewCommand('prepare', App.PrapareFull),
            App.NewCommand("to", App.Options.NewWalk("wd")),
            App.NewCommand("ask", App.Quest.WD.QuestionCancel),
            App.NewCommand("ask", App.Quest.WD.QuestionQuest),
            App.NewCommand("function", function(){Start(snap)}),
        ]).Push()
        App.Next()
    }
    State.prototype.Leave = function (context, oldstatue) {
        Userinput.hideall()
    }
    return State
})(App)