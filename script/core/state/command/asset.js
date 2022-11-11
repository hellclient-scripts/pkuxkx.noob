(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.command.asset"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.Commands([
            App.NewCommand("do","i"),
            App.NewCommand("nobusy"),
            App.NewCommand("function",function(){
                App.Core.Asset.Start(App.GetContext("Strategy"))
            }),
        ]).Push()
        App.Next()
    }
    return State
})(App)