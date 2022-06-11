(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wd.wd"
    }
    let re=/^(.*)\((.+)\)$/
    let Start=function(){
        let output=App.Data.Ask.Lines[0]
        if (output.Words.length<2){
            App.Fail()
            return 
        }
        switch (output.Words[1].Text){
            case "说道：「武当派以真武七截阵闻名天下，每个拜入武当的入门弟子都需要学习阵法演练（zhenfa），":
                App.Quest.WD.Zhen.Start()
            break
            case "说道：「道家炼气最讲究时辰和地点了，现在正是采气的最佳时间。":
                App.Quest.WD.Caiqi.Start()
            break
            case "说道：「武当三侠最近迷上了炼丹，需要一个道童帮他看守丹炉，你到俞岱岩那里帮他看看炉火吧。":
                App.Quest.WD.Liandan.Start()
            break
            case "说道：「你已经很长时间没有fullme了，我看你是机器人吧！":
                App.Core.Quest.Cooldown("wd",60000)
                App.Fail()
            break
            case "说道：「今天全派弟子要在":
                let label=output.Words[6].Text
                let data
                if (label[0]=="第"){
                    data=["",CNumber.Convert(label.slice(1).split("章",1)[0])]
                }else{
                    data=label.match(re)
                }
                App.Quest.WD.Chanting.Start(output.Words[2].Text,output.Words[4].Text,data[1],data[2]-0)
            break
            default:
                App.Core.Quest.Cooldown("wd",30000)
                App.Fail()
                return
        }
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.Quest.WD.Zhen.Dir=RandomKey(App.Quest.WD.Zhen.Locations)
        App.Quest.WD.Zhen.Back=App.Quest.WD.Zhen.Locations[App.Quest.WD.Zhen.Dir]

        App.Commands([
            App.NewCommand('prepare',App.PrapareFull),
            App.NewCommand("to",App.Options.NewWalk("wd")),
            App.NewCommand("ask",App.Quest.WD.QuestionCancel),
            App.NewCommand("ask",App.Quest.WD.QuestionQuest),
            App.NewCommand("function",Start),
        ]).Push()
        App.Next()
    }
    State.prototype.Leave=function(context,oldstatue){
        Userinput.hideall()
    }
    return State
})(App)