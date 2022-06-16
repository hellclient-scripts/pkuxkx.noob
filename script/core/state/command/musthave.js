(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.command.musthave"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let items=App.GetContext("item")
        App.Commnds([
            App.NewCommand("do","i2"),
            App.NewCommand("nobusy"),
            App.NewCommand("function",function(){
                if (App.HasAnyItemObj(items)){
                    App.Next()
                }else{
                    App.Fail()
                }
            }),
        ]).Push()
        App.Next()
    }
    return State
})(App)