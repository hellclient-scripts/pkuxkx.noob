(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wdj.wdj"
    }
    let Start=function(){
        let output=App.Data.Ask.Lines[0]
        if (output.Words.length<2){
            App.Fail()
            return 
        }
        switch (output.Words[1].Text){
            case "说道：「你去提水浇菜地。":
            case "说道：「我不是给过你任务了吗？提水浇菜地，快去！":
                App.Quest.WDJ.Jiaoshui.Start()
            break
            case "说道：「你去提水浇田。":
                case "说道：「我不是给过你任务了吗？提水浇田，快去！":
                    App.Quest.WDJ.Jiaoshui.Start2()
                break
            case "说道：「你去把睡房的便桶全部倒进茅房。":
            case "说道：「我不是给过你任务了吗？把睡房的便桶全部倒进茅房，快去！":
                App.Quest.WDJ.Maofang.Start()
            break
            case "说道：「你去弄点烂菜叶喂猪。":
            case "说道：「我不是给过你任务了吗？弄点烂菜叶喂猪，快去！":
                App.Quest.WDJ.Weizhu.Start()
            break
            case "说道：「你去把书房书架上的书整理一下。":
            case "说道：「我不是给过你任务了吗？把书房书架上的书整理一下，快去！":
                App.Quest.WDJ.Zhengli.Start()
                break
            default:
                App.Fail()
                return
        }
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.Commands([
            App.NewCommand("to",App.Options.NewWalk("wdj")),
            App.NewCommand("patrol",App.Options.NewPath("n")),
            App.NewCommand("do","drink"),
            App.NewCommand("patrol",App.Options.NewPath("s;su")),
            App.NewCommand("do","have"),
            App.NewCommand("patrol",App.Options.NewPath("nd")),
            App.NewCommand("ask",App.Quest.WDJ.QuestionJob),
            App.NewCommand("function",Start),
        ]).Push()
        App.Next()
    }
    State.prototype.Leave=function(context,oldstatue){
        Userinput.hideall()
    }
    return State
})(App)