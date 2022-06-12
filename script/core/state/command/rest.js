(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.command.rest"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let delay=App.GetContext("Delay")
        if (delay<=0){
            delay=1
        }
        App.Commands([
            App.NewCommand("do",App.GetParamWaitCmd()),
            App.NewCommand("delay",delay),
            App.NewCommand("do","halt"),
        ]).Push()
        App.Next()
    }
    return State
})(App)