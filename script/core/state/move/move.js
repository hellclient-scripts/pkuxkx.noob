(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateMove=function(){
        basicstate.call(this)
        this.ID="move"
    }
    StateMove.prototype = Object.create(basicstate.prototype)
    StateMove.prototype.Enter=function(context,newstatue){
        world.EnableTriggerGroup("move",true)
        basicstate.prototype.Enter.call(this,context,newstatue)
    }
    StateMove.prototype.Leave=function(context,newstatue){
        world.EnableTimer("steptimeout",false)
        world.EnableTriggerGroup("move",false)
        basicstate.prototype.Leave.call(this,context,newstatue)
    }
    StateMove.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "move.wrongway":
                Note("路径错误")
                App.Fail()
            break
            case "move.ignore":
                this.Ignore()
            break
        }
    }
    StateMove.prototype.Ignore=function(){
        let move=App.GetContext("Move")
        move.Ignore=true
    }
    StateMove.prototype.Go=function(command){
        App.Go(command)
    }
    StateMove.prototype.TryMove=function(step){
        if (!step){
            let move=App.GetContext("Move")
            step=move.Current
        }
        this.Go(step.Command)
    }
    return StateMove
})(App)