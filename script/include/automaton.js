(function(){
    let Automaton=function(final,states){
        this.FinalState=final
        this.Context={}
        this.Transitions=states|[]
        this.FailState=final
    }
    Automaton.prototype.WithFinalState=function(final){
        this.FinalState=final
        return this
    }
    Automaton.prototype.WithFailState=function(final){
        this.FailState=final
        return this
    }
    Automaton.prototype.WithTransitions=function(states){
        this.Transitions=states|[]
        return this
    }
    Automaton.prototype.WithData=function(key,value){
        this.Context[key]=value
        return this
    }
    return Automaton
})()