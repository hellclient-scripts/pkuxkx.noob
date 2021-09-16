(function(app){
  app.Tasks={}
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
          world.Note("正在执行任务["+app.CurrentTask.ID+"]中，无法执行新任务。")
          return false
      }
      world.Note("开始执行任务["+id+"]。")
      app.CurrentTask=task
      app.Stopped=false
      task.Execute(data,onFinish,onFail)
      return true
  }
})(App)