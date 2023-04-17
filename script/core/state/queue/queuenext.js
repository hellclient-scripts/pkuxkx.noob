(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.queue.next"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter = function (context, oldstatue) {
        App.Core.Quest.SetOnline(null)
        basicstate.prototype.Enter.call(this, context, oldstatue)
        let queue = App.GetContext("Queue")
        if (App.Stopped || queue.Remain.length === 0) {
            App.Next()
            return
        }
        let str = queue.Remain.shift()
        let current = new Directive(str)
        switch (current.Command) {
            case "#prepare":
                App.NewCommand('prepare', App.PrapareFull).WithFinalState("core.state.queue.next").Push()
                App.Next()
                break
            case "#q":
                App.NewCommand('quest', current.Data).WithFinalState("core.state.queue.next").WithFailState("core.state.queue.next").Push()
                App.Next()
                break
            case "#to":
                let c = new Directive(current.Data)
                let vehicle
                let target
                if (c.Data) {
                    vehicle = c.Command
                    target = c.Data
                } else {
                    vehicle = ""
                    target = c.Command
                }
                App.NewCommand("to", App.Options.NewWalk(target, vehicle)).WithFinalState("core.state.queue.next").Push()
                App.Next()
                break
            case "#move":
                break
            case "#nobusy":
                App.NewCommand("nobusy").WithFinalState("core.state.queue.next").Push()
                App.Next()
                break
            case "#do":
                App.NewCommand("do", current.Data).WithFinalState("core.state.queue.next").Push()
                App.Next()
                break
            case "#sleep":
                App.NewCommand("sleep").WithFinalState("core.state.queue.next").Push()
                App.Next()
                break
            case "#delay":
                let data = current.Data
                if (isNaN(data) || (data - 0) <= 0) {
                    throw "delay 的秒数必须为正数"
                }
                let delay = (data - 0)
                App.NewCommand("delay", delay).WithFinalState("core.state.queue.next").Push()
                App.Next()

                break
            case "#loop":
                if (!App.Stopped) {
                    queue.Remain = CloneArray(queue.Queue)
                }
                App.NewCommand("delay", App.GetNumberParam("queuedelay")).WithFinalState("core.state.queue.next").Push()
                App.Next()
                break
            case "#captcha":
                App.API.Captcha(current.Data, "core.state.queue.next", "core.state.queue.next")
                break
            case "#item":
                var cdata=current.Data.split("::")
                if (cdata.length==1){
                    cdata.push(1)
                }
                App.NewCommand("item", App.Options.NewItem(cdata[0],cdata[1]-0)).WithFinalState("core.state.queue.next").Push()
                App.Next()
                break
            case "#buy":
                var cdata=current.Data.split("::")
                if (cdata.length==1){
                    cdata.push(1)
                }
                App.NewCommand("buy", App.Options.NewItem(cdata[0],cdata[1]-0)).WithFinalState("core.state.queue.next").Push()
                App.Next()
                break
            case "#neili":
                App.NewCommand("neili", current.Data-0).WithFinalState("core.state.queue.next").Push()
                App.Next()
                break
            default:
                App.NewCommand("do", str).WithFinalState("core.state.queue.next").Push()
                App.Next()
        }

    }
    return State
})(App)