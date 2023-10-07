(function (App) {
    let timere=/^仍需((.*)分钟*){0,1}((.*)秒){0,1}才能接到下个任务。$/
    App.Core.Job={}
    App.Data.Job={}
    App.Core.Job.OnStart=function(name, output, wildcards){
        world.EnableTriggerGroup("job",true)
        App.Data.Job={}
    }
    let calc=function(text){
        if (text.startsWith("现在即可接到下个任务")||text.startsWith("任务正在进行中。")||text.startsWith("任务已经失败。")){
            return 0
        }
        let result=text.match(timere)
        if (result){
            let delay=0
            let min=0
            let second=0
            if (result[2]){
                min=CNumber.Convert(result[2])
                delay=delay+(min*60*1000)
            }
            if (result[4]){
                second=CNumber.Convert(result[4])
                delay=delay+(second*1*1000)
            }
            Note("在" +min+" 分 "+ second+"秒后可接任务")
            return Now()+delay
        }
        return -1
    }
    App.Core.Job.OnJob=function(name, output, wildcards){
        let job={
            ID:wildcards[0],
            Status:wildcards[1],
            Color:JSON.parse(DumpOutput(1))[0]["Words"][7].Color,
            Next:calc(wildcards[1])
        }
        App.Data.Job[job.ID]=job
    }
    App.Core.Job.IsReady=function(id){
        return App.Data.Job[id]&&App.Data.Job[id].Status.startsWith("现在即可接到下个任务")
    }
    App.Core.Job.IsFail=function(id){
        if (!App.Data.Job[id]){
            return null
        }
        return App.Data.Job[id].Status.startsWith("任务已经失败。")||App.Data.Job[id].Status.startsWith("任务正在进行中。")
    }
    App.Core.Job.OnEnd=function(name, output, wildcards){
        world.EnableTriggerGroup("job",false)
    }
    world.EnableTriggerGroup("job",false)

})(App)