(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let DFS = Include("include/dfs.js")
    let StateLocate=function(){
        basicstate.call(this)
        this.ID="locate"
    }
    StateLocate.prototype = Object.create(basicstate.prototype)
    StateLocate.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        this.Start()
    }
    StateLocate.prototype.Start=function(){
        let move=App.GetContext("Move")
        let dfs=new DFS(move.Target-0)
        move.Context=dfs.New()
        move.StartCmd="unset brief;l"
        this.Locating()
    }
    StateLocate.prototype.Locating=function(){
        App.ChangeState("locating")
    }
    return StateLocate
})(App)