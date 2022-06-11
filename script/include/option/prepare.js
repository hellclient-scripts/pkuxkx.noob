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

    return Prepare
})(App)