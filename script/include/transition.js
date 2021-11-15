(function(){
    let Transition=function(final,states){
        this.FinalState=final
        this.Context={}
        this.States=states|[]
        this.FailState=final
    }
    Transition.prototype.WithFinalState=function(final){
        this.FinalState=final
        return this
    }
    Transition.prototype.WithFailState=function(final){
        this.FailState=final
        return this
    }
    Transition.prototype.WithStates=function(states){
        this.States=states|[]
        return this
    }
    Transition.prototype.WithData=function(key,value){
        this.Context[key]=value
        return this
    }
    return Transition
})()