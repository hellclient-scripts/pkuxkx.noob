(function(){
    var StateContext=function(){
        this.LastState=null
        this.State=null
    }
    StateContext.prototype.ChangeState=function(newstatue){
        let old=this.State
        if (this.State){
            this.State.Leave(this,newstatue)
        }
        this.State=newstatue
        this.LastState=old
        this.State.Enter(this,old)
    }
    StateContext.prototype.RollbackState=function(newstatue){
        this.State=newstatue
    }

    StateContext.prototype.OnEvent=function(event,data){
        if (this.State){
            this.State.OnEvent(this,event,data)
        }
    }
    
    return StateContext
})()