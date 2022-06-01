(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateQueueNext=function(){
        basicstate.call(this)
        this.ID="core.state.queue.next"
    }
    StateQueueNext.prototype = Object.create(basicstate.prototype)
    StateQueueNext.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        let queue=App.GetContext("Queue")
        if (App.Stopped || queue.Remain.length === 0) {
            App.Finish()
            return
        }
        let str = queue.Remain.shift()
        let current = new Directive(str)
        switch (current.Command) {
            case "#prepare":
                App.StartFullPrepare(this.ID)
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
                App.Drive(vehicle)
                App.NewActive(target,"","core.state.queue.next",false).Start()
                break
            case "#move":
                break
            case "#afterbusy":
                App.Automaton.Push(["nobusy"],"core.state.queue.next")
                App.ChangeState("ready")
                break
            case "#do":
                App.NewActive("",current.Data,"core.state.queue.next",false).Start()
                break
            case "#delay":
                let data=current.Data
                if (isNaN(data) || (data - 0) <= 0) {
                    throw "delay 的秒数必须为正数"
                }
                let delay=(data - 0) / 1000
                App.Wait(delay,"core.state.queue.next")
                break
            case "#loop":
                if (!App.Stopped) {
                    queue.Remain = CloneArray(queue.Queue)
                }
                App.ChangeState("core.state.queue.loop")
                break
            case "#captcha":
                App.API.Captcha(current.Data,"core.state.queue.next","core.state.queue.next")
                break
            default:
                App.NewActive("",str,"core.state.queue.next",false).Start()
        }

    }
    return StateQueueNext
})(App)