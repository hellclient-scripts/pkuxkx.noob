(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let StatePrepareConfrim=function(){
        basicstate.call(this)
        this.ID="core.state.prepare.confirm"
    }
    StatePrepareConfrim.prototype = Object.create(basicstate.prototype)
    StatePrepareConfrim.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        let prepare=App.GetContext("Prepare")
        let p=prepare.Try()
        if (p){
            App.Automaton.Current().Insert(["core.state.prepare.check",this.ID])
            p.Execute()
        }else{
            App.Next()
        }
    }
    return StatePrepareConfrim
})(App)