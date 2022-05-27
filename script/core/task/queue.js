(function (app) {
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
            app.Send("l")
            app.Automaton.Push(["core.state.queue.next"]).WithData("Queue",q)
            app.ResponseReady()
        }
    }
    Queue.prototype = Object.create(Task.prototype)
    app.RegisterState(new (Include("core/state/queue/queuenext.js"))())
    app.RegisterState(new (Include("core/state/queue/queueloop.js"))())
    app.RegisterTask(new Queue())

})(App)