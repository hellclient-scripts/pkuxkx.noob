(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let DFS = Include("include/dfs.js")
    let State=function(){
        basicstate.call(this)
        this.ID="search"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        this.Start()
    }
    State.prototype.Start=function(){
        let move=App.GetContext("Move")
        let dfs=new DFS((move.Target-0)+1)

        move.Context=dfs.New()
        move.StartCmd="unset brief;l"
        this.Searching()
    }
    State.prototype.Searching=function(){
        let move = App.GetContext("Move")
        move.StateOnStep = "searching"
        let data = move.Data
        if (data && data.State) {
            move.StateOnStep = data.State
        }
        App.ChangeState(move.StateOnStep)
    }
    return State
})(App)