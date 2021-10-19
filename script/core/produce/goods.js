(function (app) {
    let produce = Include("core/task/produce.js")
    app.RegisterCallback("core.task.goods.arrive",function(){
        if (app.GetTaskID() =="produce.goods"){
            app.Send(app.CurrentTask.Item.Command)
            app.Send("i2")
            app.CheckBusy("core.task.goods.finish")
        }
    })
    app.RegisterCallback("core.task.goods.finish",function(){
        if (app.GetTaskID() =="produce.goods"){
            app.CurrentTask.Finish(app.CurrentTask.Item)
        }
    })    
    let Goods=function(){
        produce.call(this, "produce.goods")
        this.Execute = function (data, onFinish, onFail) {
            produce.prototype.Execute.call(this, data, onFinish, onFail)
            let move=app.NewMove("walk",this.Item.Location,"core.task.goods.arrive",{})
            move.onFail="core.task.fail"
            move.Start()
        }
    }
    Goods.prototype = Object.create(produce.prototype)
    app.RegisterTask(new Goods())
})(App)