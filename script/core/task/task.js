(function (app) {
    let Task=function(id){
        if (!id) {
            throw "Task的id不能为空"
        }
        this.ID=id
        this.Name=""
        this.Desc=""
        this.OnFinish=""
        this.OnFail=""
        this.Data=""
        this.Execute=function(data, onFinish, onFail){
            Task.prototype.Execute.call(this, data, onFinish, onFail)
        }
    }
    Task.prototype.OnClose=function () {
        
    }
    Task.prototype.Finish=function(data){
        this.OnClose()
        app.CurrentTask=null
        app.Stopped=false
        return app.ExecuteCallback(this.OnFinish,data)
    }
    Task.prototype.Fail=function(data){
        this.OnClose()
        app.CurrentTask=null
        app.Stopped=false
        return app.ExecuteCallback(this.OnFail,data)
    }
    Task.prototype.Cancel=function(){
        this.OnClose()
        app.CurrentTask=null
        app.Stopped=false
    }
    Task.prototype.Execute=function(data,onFinish,onFail){
        this.Data=data?data:"",
        this.OnFinish=onFinish?"":onFinish
        this.OnFail=onFail?"":onFail
    }
    Task.prototype.Avaliable=function (){
        return true
    }
    return Task
})(App)