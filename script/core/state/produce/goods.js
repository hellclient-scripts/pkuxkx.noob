(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateGoods=function(){
        basicstate.call(this)
        this.ID="goods"
    }
    StateGoods.prototype = Object.create(basicstate.prototype)
    StateGoods.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        let item=app.GetContext("Item")
        let a=app.Automaton.Push()
        a.WithTransitions(["core.state.produce.move","nobusy","core.state.produce.execute","nobusy"])
        a.WithData("Item",item)
        app.ChangeState("ready")
    }
    return StateGoods
})(App)