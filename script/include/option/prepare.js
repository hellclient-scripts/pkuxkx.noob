(function (App) {
    let Prepare=function(level,items,group,exceptedmap){
        this.Level=level
        this.Items=items
        this.Group=group
        this.Excepted=exceptedmap
    }
    Prepare.prototype.Try=function(){
        if (this.Group){
            return App.TryProposalGroups(this.Items,this.Excepted)
        }else{
            return App.TryProposals(this.Items,this.Excepted)
        }
    }
    Prepare.prototype.Check=function(){
        App.Check(this.Level)
    }

    return Prepare
})(App)