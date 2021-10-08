(function(app){
    let Move=function(mode,target,onFinish,options){
        if (!options){
            options={}
        }
        this.Target=target
        this.Mode=mode
        this.Ignore=false
        this.Paused=false
        this.Current=null
        this.OnFinish=onFinish?onFinish:""
        this.Data=options.Data?options.Data:""
        this.Context=null
        this.OnStep=options.OnStep?options.OnStep:""
        this.StepData=options.StepData?options.StepData:""
        this.OnFail=options.OnFail?options.OnFail:""
        this.OnWrongway=options.OnWrongway?options.OnWrongway:""
        this.Vehicle=options.Vehicle
        this.OnStart=function(){}
        this.Start=function(){
            app.Drive(this.Vehicle)
            app.Raise("MoveInit")
            if (app.Data.Move==null){
                app.Data.Move=this
                world.EnableTriggerGroup("move",true)
                this.OnStart()
            }else{
                app.Data.PendingMove=this
            }
        }
        this.OnStepTimeout=function(){
            
        }
        this.Pause=function(){
            this.Paused=true
        }
        this.Resume=function(){
        }
        this.Retry=function(){
        }
        this.OnStop=function(){}
        this.Stop=function(){
            this.OnStop()
            world.EnableTimer("steptimeout",false)
            world.EnableTriggerGroup("move",false)
            app.Data.Move=null
            app.Data.PendingMove=null    
        }
        this.OnRoomObjEnd=function(){
            
        }
        this.Go=function(command){
            app.Go(command)
        }
        this.TryMove=function(step){
            if (!step){
                step=this.Current
            }
            this.Go(step.Command)
        }
    }
    return Move
})(App)