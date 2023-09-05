(function (App) {
    let Task = Include("core/task/task.js")
    let queue = Include("core/queue/queue.js")

    var re = /\|\|/
    let Queue = function () {
        Task.call(this, "queue")
        this.Execute = function (data, onFinish, onFail) {
            Task.prototype.Execute.call(this, data, onFinish, onFail)
            if (!data) {
                data = ""
            }
            let list = data.split(re)
            let q=new queue(list)
            App.Look()
            App.Send("i2")
            App.Automaton.Push(["core.state.queue.next"]).WithData("Queue",q)
            App.ResponseReady()
        }
    }
    Queue.prototype = Object.create(Task.prototype)
    App.RegisterState(new (Include("core/state/queue/queuenext.js"))())
    App.RegisterState(new (Include("core/state/queue/queueloop.js"))())
    App.RegisterTask(new Queue())

})(App)