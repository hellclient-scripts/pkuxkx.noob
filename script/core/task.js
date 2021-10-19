(function(app){
  app.Tasks={}
  app.QueuedTasks=[]
  app.CurrentTask=null
  app.Stopped=false
  app.RegisterTask=function(task){
    if (task.ID==""){
        throw "Task id不可为空"
    }
    app.Tasks[task.ID]=task
  }
  app.GetTaskID=function(){
      if (app.CurrentTask){
          return app.CurrentTask.ID
      }
      return ""
  }
  app.ExecuteTask=function(id,data,onFinish,onFail) {
      let task=app.Tasks[id]
      if (!task){
          throw "Task [ "+ id +" ]未找到"
      }
      if (!task.Avaliable()){
        return false
    }
      if (app.CurrentTask){
        app.QueuedTasks.unshift(app.CurrentTask)
      }
      if (app.QueuedTasks.length==0){
        world.Note("开始执行任务["+id+"]。")
      }
      app.CurrentTask=task
      app.Stopped=false
      task.Execute(data,onFinish,onFail)
      return true
  }
  app.RegisterCallback("core.task.fail",function(){
    if (app.CurrentTask){
        app.CurrentTask.Fail()
      }
  })
  app.RegisterCallback("core.task.Finish",function(data){
    if (app.CurrentTask){
        app.CurrentTask.Finish()
      }
  })
})(App)