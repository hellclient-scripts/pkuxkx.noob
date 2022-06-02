(function (App) {
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
    }
    Task.prototype.OnClose=function () {
        
    }
    Task.prototype.Finish=function(data){
        this.OnClose()
        if (App.QueuedTasks.length){
            App.CurrentTask=App.QueuedTasks.shift()
        }else{
            App.CurrentTask=null
            App.Stopped=false
        }
        return App.ExecuteCallback(this.OnFinish,data)
    }
    Task.prototype.Fail=function(data){
        this.OnClose()
        App.CurrentTask=null
        App.Stopped=false
        return App.ExecuteCallback(this.OnFail,data)
    }
    Task.prototype.Cancel=function(){
        this.OnClose()
        App.CurrentTask=null
        App.Stopped=false
    }
    Task.prototype.Execute=function(data,onFinish,onFail){
        this.Data=data?data:"",
        this.OnFinish=onFinish?onFinish:""
        this.OnFail=onFail?onFail:""
    }
    Task.prototype.Avaliable=function (){
        return true
    }
    return Task
})(App)