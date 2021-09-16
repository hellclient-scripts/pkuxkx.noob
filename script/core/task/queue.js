(function(app){
    let Task=Include("core/task/task.js")
    var re=/\|\|/
    app.RegisterCallback("app.core.task.queuenext",function() {
        if (app.GetTaskID()=="queue"){
            app.CurrentTask.Next()
        }
    })
    app.RegisterCallback("app.core.task.queuefail",function() {
        if (app.GetTaskID()=="queue"){
            app.CurrentTask.Fail()
        }
    })
    app.RegisterCallback("core.task.to.move", function (data) {
        if (app.GetTaskID()=="queue" && data) {
            app.NewMove("walk", data, "app.core.task.queuenext", { OnFail: "app.core.task.queuefail"}).Start()
        }
    })
    app.Bind("Response.core.task.queue.to", "core.task.to.move")
    let Queue=function (){
        Task.call(this,"queue")
        this.Execute=function (data,onFinish,onFail) {
            Task.prototype.Execute.call(this,data,onFinish,onFail)
            if (!data){
                data=""
            }
            let queue=data.split(re)
            app.Data.Queue={
                Queue:CloneArray(queue,true),
                Remain:CloneArray(queue,true),
            }
            this.Next()
        }
        this.OnClose=function() {
            delete(app.Data.Queue)
        }
        this.Next=function () {
            if (app.Data.Queue.Remain.length===0){
                this.Finish()
                return
            }
            let str=app.Data.Queue.Remain.shift()
            let current=new Directive(str)
            switch (current.Command){
                case "#to":
                    this.To(current.Data)
                break
                case "#afterbusy":
                    this.Afterbusy(current.Data)
                break
                case "#do":
                    this.Do(current.Data)
                break
                case "#delay":
                    this.Delay(current.Data)
                break
                case "#loop":
                    if (!app.Stopped){
                        app.Data.Queue.Remain=CloneArray(app.Data.Queue.Queue)
                    }
                    this.Next()
                default:
                    this.Do(str)
            }

        }
        this.To=function(data) {
            app.Send("l")
            app.Check(app.CheckLevelFull)
            app.Response("core", "task.queue.to",data)    
        }
        this.Afterbusy=function () {
            app.CheckBusy("app.core.task.queuenext")
        }
        this.Do=function(data) {
            app.Send(data)
            app.ExecuteCallback("app.core.task.queuenext")
        }
        this.Delay=function(data) {
            if (isNaN(data)||(data-0)<=0){
                throw "delay 的秒数必须为正数"
            }
            world.DoAfterSpecial((data-0)/1000, 'App.ExecuteCallback("app.core.task.queuenext")', 12);
        }
    }
    Queue.prototype = Object.create(Task.prototype)
    app.RegisterTask(new Queue())
    
})(App)