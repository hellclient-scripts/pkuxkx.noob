(function (app) {
    let patrol = Include("core/state/move/patrol.js")
    let StateFind=function(){
        patrol.call(this)
        this.ID="find"
    }
    StateFind.prototype = Object.create(patrol.prototype)
    StateFind.prototype.Enter=function(context,oldstatue){
        let move=app.GetContext("Move")
        move.StateOnStep="finding"
        patrol.prototype.Enter.call(this,context,oldstatue)
    }
    return StateFind
})(App)