(function (App) {
    let Prepare=function(level,items,group){
        this.Level=level
        this.Items=items
        this.Group=group
    }
    Prepare.prototype.Try=function(){
        if (this.Group){
            return App.TryProposalGroups(this.Items)
        }else{
            return App.TryProposals(this.Items)
        }
    }
    Prepare.prototype.Check=function(){
        App.Check(this.Level)
    }
    Prepare.prototype.Start=function(final){
        App.Automaton.Push(["core.state.prepare.check","core.state.prepare.confirm"],final).WithData("Prepare",this)
        App.ChangeState("ready")
    }
    return Prepare
})(App)