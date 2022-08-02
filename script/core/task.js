(function(App){
  App.Tasks={}
  App.QueuedTasks=[]
  App.CurrentTask=null
  App.Stopped=false
  App.RegisterTask=function(task){
    if (task.ID==""){
        throw "Task id不可为空"
    }
    App.Tasks[task.ID]=task
  }
  App.GetTaskID=function(){
      if (App.CurrentTask){
          return App.CurrentTask.ID
      }
      return ""
  }
  App.ExecuteTask=function(id,data,onFinish,onFail) {
      let task=App.Tasks[id]
      if (!task){
          throw "Task [ "+ id +" ]未找到"
      }
      
      if (!task.Avaliable()){
        return false
    }
      if (App.CurrentTask){
        App.QueuedTasks.unshift(App.CurrentTask)
      }
      if (App.QueuedTasks.length==0){
        world.Note("开始执行任务["+id+"]。")
      }
      App.CurrentTask=task
      App.Stopped=false
      App.Core.Sell.Reset()
      task.Execute(data,onFinish,onFail)
      return true
  }
  App.RegisterCallback("core.task.fail",function(){
    if (App.CurrentTask){
        App.CurrentTask.Fail()
      }
  })
  App.RegisterCallback("core.task.Finish",function(data){
    if (App.CurrentTask){
        App.CurrentTask.Finish()
      }
  })
})(App)