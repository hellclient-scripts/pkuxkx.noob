(function (app) {
    let Prepare=function(level,items,group){
        this.Level=level
        this.Items=items
        this.Group=group
    }
    Prepare.prototype.Try=function(){
        if (this.Group){
            return app.TryProposalGroups(this.Items)
        }else{
            return app.TryProposals(this.Items)
        }
    }
    Prepare.prototype.Check=function(){
        app.Check(this.Level)
    }
    Prepare.prototype.Start=function(final){
        app.Automaton.Push(["core.state.prepare.check","core.state.prepare.confirm"],final).WithData("Prepare",this)
        app.ChangeState("ready")
    }
    return Prepare
})(App)