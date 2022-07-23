(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.command.locate"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let depth=App.GetContext("Depth")
        if (depth<=0){
            depth=1
        }
        App.Core.Search.Locate(depth)
    }
    return State
})(App)