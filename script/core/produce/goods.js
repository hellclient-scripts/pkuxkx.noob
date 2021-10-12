(function (app) {
    let produce = Include("core/produce/produce.js")
    app.RegisterCallback("core.produce.arrive",function(){
        if (app.GetTaskID() =="produce.goods"){
            app.Send(app.CurrentTask.Item.Command)
            app.Send("i2")
            app.CheckBusy("core.produce.finish")
        }
    })
    app.RegisterCallback("core.produce.finish",function(){
        if (app.GetTaskID() =="produce.goods"){
            app.CurrentTask.Finish(app.CurrentTask.Item)
        }
    })    
    let Goods=function(){
        produce.call(this, "produce.goods")
        this.Execute = function (data, onFinish, onFail) {
            produce.prototype.Execute.call(this, data, onFinish, onFail)
            let move=app.NewMove("walk",this.Item.Location,"core.produce.arrive",{})
            move.onFail=onFail
            move.Start()
        }
    }
    Goods.prototype = Object.create(produce.prototype)
    app.RegisterTask(new Goods())
})(App)