(function (App) {
    let timere=/^仍需((.*)分钟*){0,1}((.*)秒){0,1}才能接到下个任务。$/
    App.Core.Job={}
    App.Data.Job={}
    App.Core.Job.OnStart=function(name, output, wildcards){
        world.EnableTriggerGroup("job",true)
        App.Data.Job={}
    }
    let calc=function(text){
        if (text.startsWith("现在即可接到下个任务")){
            return 0
        }
        let result=text.match(timere)
        if (result){
            let delay=0
            if (result[2]){
                delay=delay+(CNumber.Convert(result[2])*60*1000)
            }
            if (result[4]){
                delay=delay+(CNumber.Convert(result[4])*1*1000)
            }
            return Now()+delay
        }
        return -1
    }
    App.Core.Job.OnJob=function(name, output, wildcards){
        let job={
            ID:wildcards[0],
            Status:wildcards[1],
            Color:JSON.parse(DumpOutput(1))[4],
            Next:calc(wildcards[1])
        }
        App.Data.Job[job.ID]=job
    }
    App.Core.Job.OnEnd=function(name, output, wildcards){
        world.EnableTriggerGroup("job",false)
    }
    world.EnableTriggerGroup("job",false)

})(App)