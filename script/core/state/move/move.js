(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateMove=function(){
        basicstate.call(this)
        this.ID="move"
    }
    StateMove.prototype = Object.create(basicstate.prototype)
    StateMove.prototype.Enter=function(context,newstatue){
        world.EnableTriggerGroup("move",true)
        basicstate.prototype.Enter.call(context,newstatue)
    }
    StateMove.prototype.Leave=function(context,newstatue){
        world.EnableTimer("steptimeout",false)
        world.EnableTriggerGroup("move",false)
        basicstate.prototype.Leave.call(context,newstatue)
    }
    StateMove.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "move.ignore":
                this.Ignore()
            break
        }
    }
    StateMove.prototype.Ignore=function(){
        let move=app.GetContext("Move")
        move.Ignore=true
    }
    return StateMove
})(App)