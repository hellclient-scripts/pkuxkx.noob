(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.traversal.arrive"

    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let data=App.Data.Traversal.Answer.split("||")
        App.NewMove("core.state.traversal.start",data[3],{}).Start()
    }
    return StateFullme
})(App)