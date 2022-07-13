(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.command.buy"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let item=App.GetContext("Item")
        if (App.Stopped||App.GetItemNumber(item.ID,true)>=item.Amount){
            App.Next()
            return
        }
        App.Commands([
            App.NewCommand("do","buy "+item.ID+";i2"),
            App.NewCommand("nobusy"),
            App.NewCommand("buy",item),
        ]).Push()
        App.Next()
    }
    return State
})(App)