(function(){
    var Step=function(command,target){
        this.Target=target?target:""
        this.Command=command
    }
    Step.prototype.SetTarget=function(target){
        this.Target=target?target:""
    }
    return Step
})()