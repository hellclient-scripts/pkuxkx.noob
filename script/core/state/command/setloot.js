(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.command.setloot"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let data=SplitN(App.GetContext("Loot")," ",2)
        if (data.length>1){
            App.SetLootCmd(data[0],data[1])
        }
        App.Next()
    }
    return State
})(App)