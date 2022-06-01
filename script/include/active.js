(function(App){
    let Active=function(location,cmd,final,nobusy){
        this.Location=location
        this.Command=cmd?cmd:""
        this.FinalState=final?final:""
        this.FailState=""
        this.Nobusy=nobusy?true:false
        this.Data=null
        this.ModeState="core.state.active.move"
    }
    Active.prototype.WithLocation=function(location){
        this.Location=location
        return this
    }
    Active.prototype.WithCommand=function(cmd){
        this.Command=cmd?cmd:""
        return this
    }
    Active.prototype.WithFinalState=function(final){
        this.FinalState=final?final:""
        return this
    }
    Active.prototype.WithFailState=function(fail){
        this.FailState=fail?fail:""
        return this
    }
    Active.prototype.WithNobusy=function(nobusy){
        this.Nobusy=nobusy?true:false
        return this
    }
    Active.prototype.WithData=function(data){
        this.Data=data
        return this
    }
    Active.prototype.WithModeState=function(state){
        this.ModeState=state
        return this
    }
    
    Active.prototype.Start=function(final){
        if (final){
            this.FinalState=final
        }
        let transitions=[]
        if (this.Location){
            transitions=[this.ModeState]

            if (this.Nobusy){
                transitions.push("nobusy")
            }  
        }
        if (this.Command){
            transitions.push("core.state.active.execute")
            if (this.Nobusy){
                transitions.push("nobusy")
            }
    
        }
        let a=App.Automaton.Push(transitions,this.FinalState)
        a.WithData("Active",this)
        if (a.FailState!=""){
            a.WithFailState(this.FailState)
        }
        App.ChangeState("ready")
    }
    return Active
})(App)