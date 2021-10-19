(function (app) {
    let Task = Include("core/task/task.js")
    let Produce=function(id){
        Task.call(this, id)
        this.Item={}
    }
    Produce.prototype = Object.create(Task.prototype)
    Produce.prototype.Execute = function (data, onFinish, onFail) {
        Task.prototype.Execute.call(this, data, onFinish, onFail)
        if (!data){
            throw "item id required"
        }
        let item=app.API.GetItem(data)
        if (!item){
            throw "item " + data +" not found"
        }
        this.Item=item
    }
    return Produce
})(App)