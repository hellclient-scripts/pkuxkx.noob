(function (App) {
    var rechat=/[【：『]/
    var re=/^[^【：『]{1,10}的摘采难度大大超过了你能力范围，看着一地的.+碎片，你满心都是无奈。$/
    var re2=/^你采集到了一些.+。$/
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.quest.caiyao.caiyao"
        this.Groups = this.Groups.concat(["state.line"])
        this.Direct = ""
        this.Last=""
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.OnLine = function (line) {
        if (line.match(rechat)){
            return
        }
        switch (line) {
            case "你现在搜索的位置似乎有些药材，可以用gather命令采集。":
                this.Direct = "gather"
                return
            case "看你手忙脚乱的！采药不是赶集。":
                this.Direct = "." + this.Last
                return
            case "这里的药材被采完了。":
            case "可是什么也没有采到。":
                this.Direct = "fail"
                return
        }
        if (line.match(re)||line.match(re2)){
            this.Direct="next"
            return
        }
        let person = line.indexOf("♀")
        let herb = line.indexOf("★")
        if (person > -1) {
            if (herb > -1) {
                this.Direct = (herb > person ? "e" : "w")
                return
            }
            if (this.Direct == "") {
                this.Direct = "s"
                return ``
            }
        }
        if (this.Direct == "" && herb > -1) {
            this.Direct = "n"
        }
    }
    State.prototype.OnEvent = function (context, event, data) {
        switch (event) {
            case "line":
                this.OnLine(data)
                return
            case "busy":
            case "nobusy":
                Note(this.Direct)
                switch (this.Direct) {
                    case "next":
                        App.Send("lookfor")
                        this.Direct = ""
                        App.Core.CheckBusy()
                        return
                    case "gather":
                        App.Send("gather")
                        this.Direct = ""
                        App.Core.CheckBusy()
                        return
                    case "n":
                    case "e":
                    case "s":
                    case "w":
                        App.Send("lookfor " + this.Direct)
                        this.Last=this.Direct
                        this.Direct = ""
                        App.Core.CheckBusy()
                        return
                    case ".n":
                    case ".e":
                    case ".s":
                    case ".w":
                        this.Direct=this.Direct.slice(-1)
                        world.DoAfterSpecial(2, 'App.Core.CheckBusy()', 12);
                        return
                }
                App.Commands([
                    App.NewCommand("function", App.Core.Traversal.Continue),
                    App.NewCommand("state", this.ID),
                ]).Push()
                App.Next()
        }
    }
    State.prototype.Enter = function (context, oldstatue) {
        if (!App.Data.Room.HasHerb) {
            App.Next()
            return
        }
        App.Send("unwield all;wield yao chu")
        this.Direct = "gather"
        App.Core.CheckBusy()
    }
    State.prototype.Leave = function (context, oldstatue) {
        App.Send("unwield all")
    }
    return State
})(App)