(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let StateWait=function(){
        basicstate.call(this)
        this.ID="wait"
        this.SN=""
    }
    StateWait.prototype = Object.create(basicstate.prototype)
    StateWait.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "core.state.wait.after":
                if (this.SN==data){
                    App.ChangeState("ready")
                }
            break
            default:
                StateWait.prototype.Enter.call(this,context,event,data)
        }
    }
    StateWait.prototype.Enter=function(context,oldstatue){
        basicstate.prototype.Enter.call(this,context,oldstatue)
        let delay=App.GetContext("Delay")
        let sn=world.GetUniqueID()
        this.SN=sn
        world.DoAfterSpecial(delay, 'App.OnStateEvent("core.state.wait.after","'+sn+'")', 12);
    }
    return StateWait
})(App)