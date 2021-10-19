(function(app){
    Include("core/task/goods.js")
    app.Produce=function(id,onFinish,onFail){
        let item=App.API.GetItem(id)
        if (item==null){
            throw "item "+id +" not found"
        }
        let taskid=""
        switch(item.Type){
            case "goods":
                taskid="produce.goods"
                break;
            default:
                throw "unknown item type"+item.Type
        }
        app.ExecuteTask(taskid,id,onFinish,onFail)
    }

    app.RegisterCallback("core.produce.item",function(data){
        app.Produce(data)
    })
    app.Bind("Response.core.produce","core.produce.item")
})(App)