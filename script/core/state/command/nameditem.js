(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.command.nameditem"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let item=App.GetContext("Item")
        let obj=App.GetItemByName(item.ID,true)
        if (obj&&obj.Count>=item.Amount){
            App.Next()
            return
        }
        App.Produce(item.ID,item.Amount)
    }
    return State
})(App)