(function(app){
    let Active=function(location,cmd,final,nobusy){
        this.Location=location
        this.Command=cmd?cmd:""
        this.FinalState=final?final:""
        this.Nobusy=nobusy?true:false
        this.Data=null
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
    Active.prototype.WithNobusy=function(nobusy){
        this.Nobusy=nobusy?true:false
        return this
    }
    Active.prototype.WithData=function(data){
        this.Data=data
        return this
    }
    Active.prototype.Start=function(final){
        if (final){
            this.FinalState=final
        }
        let transitions
        if (this.Nobusy){
            transitions=["core.state.active.move","nobusy","core.state.active.execute","nobusy"]
        }else{
            transitions=["core.state.active.move","core.state.active.execute"]
        }
        let a=app.Automaton.Push(transitions,this.FinalState)
        a.WithData("Active",this)
        app.ChangeState("ready")
    }
    return Active
})(App)