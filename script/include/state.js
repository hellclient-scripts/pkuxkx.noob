(function(){
    var State=function(id){
        this.ID=id
        this.Tags={}
    }
    State.prototype.Enter=function(context,oldstatue){
    }
    State.prototype.Leave=function(context,newstatue){
    }
    State.prototype.OnEvent=function(context,event,data){
    }
    return State
})()