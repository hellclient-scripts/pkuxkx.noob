(function(){
    let Automaton=function(final,states){
        this.FinalState=final
        this.Context={}
        this.Transitions=states?states:[]
        this.FailState=""
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
        this.Transitions=states?states:[]
        return this
    }
    Automaton.prototype.Insert=function(states){
        let s=states?states:[]
        this.Transitions=s.concat(this.Transitions)
    }
    Automaton.prototype.Append=function(states){
        let s=states?states:[]
        this.Transitions=this.Transitions.concat(s)
    }
    Automaton.prototype.WithData=function(key,value){
        this.Context[key]=value
        return this
    }
    return Automaton
})()