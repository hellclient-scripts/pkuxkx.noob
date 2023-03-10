(function (App) {
    let re = /^现在你只能尝试往(.*)里灌注内力。$/
    let zouhuore=/^你的真气在.+运行受阻，还是尽快想办法把受损的经脉恢复吧。/
    let veinre=/^你的.+已经贯通成功了。$/
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.quest.vein.vein"
        this.Groups = this.Groups.concat(["state.line"])
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Online = function (line) {
        if (App.Quest.Vein.Data.Fail) {
            return
        }
        switch (line) {
            case "你的任督二脉未通，先尝试dz吧。":
            case "请参考help，正确设定目标经脉set vein。你必须设定一个目标经脉。vein -h获得帮助。":
            case "过多尝试通脉次数，有害无益。今天就到此为止吧。":
            case "你现在修行经验不足，无法强行通脉！":
                App.Quest.Vein.Data.Fail = true
                break
            default:
                let result = line.match(re)
                if (result) {
                    App.Quest.Vein.Next = result[1]
                    return
                }
                let resultzouguo=line.match(zouhuore)
                if (resultzouguo){
                    App.Quest.Vein.Data.Fail = true
                    return
                }
                let resultvein=line.match(veinre)
                if (resultvein){
                    App.Quest.Vein.Data.Fail = true
                    return
                }
        }
    }
    State.prototype.OnEvent = function (context, event, data) {
        switch (event) {
            case "line":
                this.Online(data)
                break
            case "busy":
                world.DoAfterSpecial(1, 'App.Core.CheckBusy()', 12);
                break
            case "nobusy":
                if (App.Quest.Vein.Data.Fail){
                    App.Quest.Vein.CoolDown()
                }
                App.Next()
                break
        }

    }
    State.prototype.Enter = function (context, oldstatue) {
        App.Quest.Vein.Data.Fail = false
        App.Send("vein through " + App.Quest.Vein.Next)
        App.Core.CheckBusy()
    }
    return State
})(App)