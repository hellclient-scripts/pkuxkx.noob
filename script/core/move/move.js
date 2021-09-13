(function(app){
    let Move=function(mode,target,onFinish,options){
        if (!options){
            options={}
        }
        this.Target=target
        this.Mode=mode
        this.Paused=false
        this.Current=null
        this.OnFinish=onFinish?onFinish:""
        this.Data=options.Data?options.Data:""
        this.Context=null
        this.OnStart=options.OnStart?options.OnStart:""
        this.OnStep=options.OnStep?options.OnStep:""
        this.StepData=options.StepData?options.StepData:""
        this.OnFail=options.OnFail?options.OnFail:""
        this.OnWrongway=options.OnWrongway?options.OnWrongway:""
        this.OnStart=function(){}
        this.Start=function(){
            this.OnStart()
            var walk=this
            if (app.Data.Move==null){
                app.Data.Move=walk
            }else{
                app.Data.PendingMove=walk
            }
    
        }
        this.OnStepTimeout=function(){

        }
        this.Pause=function(){
            this.Paused=true
        }
        this.Resume=function(){
        }
        this.OnStop=function(){}
        this.Stop=function(){
            this.OnStop()
            world.EnableTimer("steptimeout",false)
            app.Data.Move=null
            app.Data.PendingMove=null    
        }
        this.OnRoomObjEnd=function(){
            
        }
        this.TryMove=function(){
            app.Send(this.Current.Command)
        }
    }
    return Move
})(App)