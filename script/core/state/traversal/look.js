(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.traversal.look"

    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let move=App.GetContext("Move")
        App.Commands([
            App.NewCommand("do","l"),
            App.NewCommand("nobusy"),
            App.NewCommand("function",function(){
                App.Push(["finding"]).WithData("Move",move)
                App.Next()
            }),
        ]).Push()
        App.Next()
    }
    return State
})(App)