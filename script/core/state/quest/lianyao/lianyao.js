(function (App) {
    let re = /^书架上的书有点乱了，你要把它们按颜色整理\(zhengli <书名> to <位置>，比如zhengli 金瓶梅 to 2\)好。$/
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.quest.lianyao.lianyao"
        this.Groups = this.Groups.concat(["state.line"])
        this.Lines = []
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.OnEvent = function (context, event, data) {
        switch (event) {
            case "line":
                switch (data) {
                    case ".:!!!!!!;:;!!!;::::::!!;:::;!!:`":
                        let line=JSON.parse(DumpOutput(1))[0]
                        switch(line.Words[0].Color){
                            case "White":
                                App.Send("halt;turndown;yun recover;dazuo max")
                            case "Red":
                                App.Send("halt;turnup;yun recover;dazuo max")
                                break
                            case "Cyan":
                                App.Send("halt;defend;yun recover;dazuo max")
                                break
                            case "Magenta":
                                App.Send("halt;blow;yun recover;dazuo max")
                                break
                        }
                        break
                    case "炉火似乎有些异常。":
                        App.Send("lookin yao lu")
                        break
                    case "药炉中的只剩下了炉渣。":
                    case "药炉正是炉火纯青之态，可以打开看看了。":
                        App.Commands([
                            App.NewCommand("eat"),
                            App.NewCommand("do", "halt;unlock;get all from yao lu;drop lu zha;i2"),
                            App.NewCommand("nobusy"),
                            App.NewCommand("state", this.ID),
                        ]).Push()
                        App.Next()
                        break
                }
                break
        }

    }
    State.prototype.Enter = function (context, oldstatue) {
        if (App.Stopped) {
            App.Fail()
            return
        }
        if (App.GetItemNumber("huo zhezi", true) < 1) {
            Note("火折子用完了")
            App.Fail()
            return
        }
        App.Send("unlock")
        for (var key in App.Quest.Lianyao.Formula) {
            if (App.GetItemNumber(key, true) < App.Quest.Lianyao.Formula[key]) {
                Note(key + "用完了")
                App.Fail()
                return
            }
        }
        for (var key in App.Quest.Lianyao.Formula) {
            for (var i=0;i<App.Quest.Lianyao.Formula[key];i++){
                App.Send("putin "+key)
            }
        }
        App.Send("fire;lock;yun recover;dazuo max")
    }
    State.prototype.Leave = function (context, oldstatue) {
    }
    return State
})(App)