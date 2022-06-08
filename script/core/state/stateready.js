(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let StateReady=function(){
        basicstate.call(this)
        this.ID="ready"
        this.Handler=null
    }
    StateReady.prototype = Object.create(basicstate.prototype)
    StateReady.prototype.Enter=function(context,newstatue){
        basicstate.prototype.Enter.call(this,context,newstatue)
        if (App.Core.Inited){
            this.Handler()
            return
        }
        App.Core.Init()
    }
    StateReady.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "inited":
                this.Handler()
            break
            default:
                basicstate.prototype.OnEvent.call(this,context,event,data)
        }
    }
    return StateReady
})(App)